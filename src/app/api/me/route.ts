import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { EXPERIENCE, PROJECTS, SOCIAL_LINKS, STACK } from "@/lib/constants";
import { createClient, type RedisClientType } from "redis";
import { RateLimiterRedis, type RateLimiterRes } from "rate-limiter-flexible";

type MeStatus = "operational" | "open_to_work";

const NAME = "Barry Henry";
const STATUS: MeStatus = "operational";
const DOCUMENTATION_URL = "https://barryhenry.com/docs";

const envSchema = z.object({
  REDIS_URL: z.string().min(1).url(),
});

function buildStandardHeaders(): Headers {
  const headers = new Headers();

  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");

  headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  return headers;
}

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor != null && xForwardedFor.trim() !== "") {
    const first = xForwardedFor.split(",")[0];
    if (first != null && first.trim() !== "") return first.trim();
  }

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp != null && xRealIp.trim() !== "") return xRealIp.trim();

  return "unknown";
}

function isRateLimiterRes(value: unknown): value is RateLimiterRes {
  if (typeof value !== "object" || value == null) return false;
  if (!("msBeforeNext" in value)) return false;

  const msBeforeNext = (value as { msBeforeNext?: unknown }).msBeforeNext;
  return typeof msBeforeNext === "number";
}

let redisClient: RedisClientType | null = null;
let redisConnectPromise: Promise<void> | null = null;
let rateLimiter: RateLimiterRedis | null = null;

async function getRedisClient(redisUrl: string): Promise<RedisClientType> {
  if (redisClient == null) {
    redisClient = createClient({ url: redisUrl });
  }
  return redisClient;
}

async function ensureRedisConnected(redisUrl: string): Promise<void> {
  const client = await getRedisClient(redisUrl);
  if (client.isOpen) return;
  if (redisConnectPromise == null) {
    redisConnectPromise = client.connect().then(() => undefined);
  }
  await redisConnectPromise;
}

async function getRateLimiter(redisUrl: string): Promise<RateLimiterRedis> {
  if (rateLimiter == null) {
    const client = await getRedisClient(redisUrl);
    rateLimiter = new RateLimiterRedis({
      storeClient: client,
      keyPrefix: "public_api_me",
      points: 10,
      duration: 60,
    });
  }
  return rateLimiter;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const headers = buildStandardHeaders();

  // Validate environment at runtime
  const envValidation = envSchema.safeParse({
    REDIS_URL: process.env.REDIS_URL,
  });

  if (!envValidation.success) {
    return NextResponse.json(
      { error: "Server misconfigured: REDIS_URL not set" },
      { status: 500, headers }
    );
  }

  const env = envValidation.data;

  try {
    await ensureRedisConnected(env.REDIS_URL);
  } catch {
    return NextResponse.json(
      { error: "Server misconfigured: Redis unavailable" },
      { status: 500, headers }
    );
  }

  const ip = getClientIp(request);

  const limiter = await getRateLimiter(env.REDIS_URL);

  try {
    await limiter.consume(ip);
  } catch (error: unknown) {
    if (!isRateLimiterRes(error)) {
      return NextResponse.json(
        { error: "Rate limiter error" },
        { status: 500, headers }
      );
    }

    const retryAfterSeconds = Math.max(0, Math.ceil(error.msBeforeNext / 1000));
    headers.set("Retry-After", retryAfterSeconds.toString());

    return NextResponse.json(
      { error: "Too Many Requests" },
      { status: 429, headers }
    );
  }

  if (EXPERIENCE.length === 0) {
    return NextResponse.json(
      { error: "Server misconfigured: EXPERIENCE is empty" },
      { status: 500, headers }
    );
  }

  if (PROJECTS.length === 0) {
    return NextResponse.json(
      { error: "Server misconfigured: PROJECTS is empty" },
      { status: 500, headers }
    );
  }

  const title = EXPERIENCE[0].role;
  const stack = STACK.filter((item) => item.proficiency === "Expert").map(
    (item) => item.name
  );

  const payload = {
    name: NAME,
    status: STATUS,
    title,
    stack,
    latest_project: PROJECTS[0],
    contact: SOCIAL_LINKS,
    documentation: DOCUMENTATION_URL,
  };

  return NextResponse.json(payload, { headers });
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: buildStandardHeaders(),
  });
}