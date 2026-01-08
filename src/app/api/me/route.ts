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

  // Prevent caching for rate-limited API responses
  // This ensures rate limiting works properly and responses aren't cached at CDN level
  headers.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  return headers;
}

function getClientIp(request: NextRequest): string | null {
  // Check x-forwarded-for header (most common)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor != null && xForwardedFor.trim() !== "") {
    const first = xForwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  // Check x-real-ip header
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp != null && xRealIp.trim() !== "") return xRealIp.trim();

  // Check request.ip (reliable on Vercel, Railway, etc.)
  // @ts-expect-error - request.ip is available in NextRequest but not in types
  if (request.ip) return request.ip;

  // Return null if no IP can be determined
  return null;
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
let anonymousRateLimiter: RateLimiterRedis | null = null;
let lastActivity: number = 0;
const CONNECTION_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

// Extend globalThis to include our cleanup interval
declare global {
  var redisCleanupInterval: NodeJS.Timeout | undefined;
}

// Periodic cleanup to prevent connection leaks in serverless environments
if (typeof globalThis !== 'undefined' && !globalThis.redisCleanupInterval) {
  globalThis.redisCleanupInterval = setInterval(async () => {
    const now = Date.now();
    if (redisClient && (now - lastActivity) > CONNECTION_TIMEOUT) {
      await closeRedisConnection();
    }
  }, CLEANUP_INTERVAL);

  process.on('SIGTERM', async () => {
    await closeRedisConnection();
    if (globalThis.redisCleanupInterval) {
      clearInterval(globalThis.redisCleanupInterval);
    }
  });

  process.on('SIGINT', async () => {
    await closeRedisConnection();
    if (globalThis.redisCleanupInterval) {
      clearInterval(globalThis.redisCleanupInterval);
    }
  });
}

async function getRedisClient(redisUrl: string): Promise<RedisClientType> {
  lastActivity = Date.now();

  if (redisClient == null) {
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries: number): number | false => {
          if (retries > 3) return false; // Stop after 3 retries
          return Math.min(retries * 1000, 3000); // Exponential backoff
        },
      },
    });

    // Handle connection errors
    redisClient.on('error', (err) => {
      console.warn('Redis client error:', err.message);
    });

    redisClient.on('connect', () => {
      console.log('Redis connected successfully');
    });

    redisClient.on('ready', () => {
      console.log('Redis client ready');
    });

    redisClient.on('end', () => {
      console.log('Redis connection ended');
      redisClient = null;
      redisConnectPromise = null;
      rateLimiter = null;
      anonymousRateLimiter = null;
    });
  }

  return redisClient;
}

async function ensureRedisConnected(redisUrl: string): Promise<void> {
  const client = await getRedisClient(redisUrl);

  if (client.isOpen && client.isReady) return;

  // Use double-checked locking to prevent race conditions
  if (redisConnectPromise == null) {
    // Create a new promise and immediately assign it to prevent race conditions
    let resolveConnection: () => void;
    let rejectConnection: (error: Error) => void;

    const connectionPromise = new Promise<void>((resolve, reject) => {
      resolveConnection = resolve;
      rejectConnection = reject;
    });

    // Atomically assign the promise to prevent other requests from creating new ones
    redisConnectPromise = connectionPromise;

    // Now attempt the connection
    client.connect()
      .then(() => {
        lastActivity = Date.now();
        resolveConnection();
      })
      .catch(async (err) => {
        // Log connection failure for debugging
        console.error('Redis connection failed:', {
          error: err instanceof Error ? err.message : String(err),
          redisUrl: redisUrl.replace(/:[^:]*@/, ':***@'), // Mask password in logs
          timestamp: new Date().toISOString()
        });

        await closeRedisConnection();
        rejectConnection(err);
      });
  }

  await redisConnectPromise;
}

// Gracefully close Redis connections
async function closeRedisConnection(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
    } catch (error) {
      console.warn('Error closing Redis connection:', error);
    } finally {
      redisClient = null;
      redisConnectPromise = null;
      rateLimiter = null;
      anonymousRateLimiter = null;
    }
  }
}

async function getRateLimiter(redisUrl: string, isAnonymous = false): Promise<RateLimiterRedis> {
  if (isAnonymous) {
    if (anonymousRateLimiter === null) {
      const client = await getRedisClient(redisUrl);
      anonymousRateLimiter = new RateLimiterRedis({
        storeClient: client,
        keyPrefix: "public_api_me_anon",
        points: 1,
        duration: 60,
      });
    }
    return anonymousRateLimiter;
  }

  if (rateLimiter === null) {
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

async function validateEnvironment(): Promise<{ success: false; response: NextResponse } | { success: true; env: { REDIS_URL: string } }> {
  const headers = buildStandardHeaders();

  const envValidation = envSchema.safeParse({
    REDIS_URL: process.env.REDIS_URL,
  });

  if (!envValidation.success) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Server misconfigured: REDIS_URL not set" },
        { status: 500, headers }
      )
    };
  }

  return { success: true, env: envValidation.data };
}

async function validateRedisConnection(redisUrl: string): Promise<{ success: false; response: NextResponse } | { success: true }> {
  const headers = buildStandardHeaders();

  try {
    await ensureRedisConnected(redisUrl);
    return { success: true };
  } catch (error) {
    // Log detailed error information for debugging
    console.error('Redis connection validation failed:', {
      error: error instanceof Error ? error.message : String(error),
      redisUrl: redisUrl.replace(/:[^:]*@/, ':***@'), // Mask password in logs
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined
    });

    // Determine if this is a potentially recoverable error
    const isRecoverable = error instanceof Error && (
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ETIMEDOUT') ||
      error.message.includes('ENOTFOUND')
    );

    const errorMessage = isRecoverable
      ? "Redis temporarily unavailable - please try again"
      : "Server misconfigured: Redis unavailable";

    return {
      success: false,
      response: NextResponse.json(
        { error: errorMessage },
        { status: isRecoverable ? 503 : 500, headers }
      )
    };
  }
}

async function checkRateLimit(request: NextRequest, redisUrl: string): Promise<{ success: false; response: NextResponse } | { success: true }> {
  const headers = buildStandardHeaders();

  const ip = getClientIp(request);
  const isAnonymous = ip == null;

  // Get the appropriate rate limiter based on client type
  const limiter = await getRateLimiter(redisUrl, isAnonymous);

  try {
    // Use IP for identified clients, or a shared anonymous key for unidentified clients
    const rateLimitKey = isAnonymous ? "anonymous_clients" : ip!;
    await limiter.consume(rateLimitKey);
    return { success: true };
  } catch (error: unknown) {
    if (!isRateLimiterRes(error)) {
      console.error("Unexpected error during rate limiting:", error);
      return {
        success: false,
        response: NextResponse.json(
          { error: "Rate limiter error" },
          { status: 500, headers }
        )
      };
    }

    const retryAfterSeconds = Math.max(0, Math.ceil(error.msBeforeNext / 1000));
    headers.set("Retry-After", retryAfterSeconds.toString());

    return {
      success: false,
      response: NextResponse.json(
        { error: "Too Many Requests" },
        { status: 429, headers }
      )
    };
  }
}

function validateServerData(): { success: false; response: NextResponse } | { success: true } {
  const headers = buildStandardHeaders();

  if (EXPERIENCE.length === 0) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Server misconfigured: EXPERIENCE is empty" },
        { status: 500, headers }
      )
    };
  }

  if (PROJECTS.length === 0) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Server misconfigured: PROJECTS is empty" },
        { status: 500, headers }
      )
    };
  }

  return { success: true };
}

function prepareResponseData(): { payload: unknown } {
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

  return { payload };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Validate environment
  const envResult = await validateEnvironment();
  if (!envResult.success) return envResult.response;

  // Validate server data integrity (before expensive operations)
  const dataValidation = validateServerData();
  if (!dataValidation.success) return dataValidation.response;

  // Validate Redis connection
  const redisResult = await validateRedisConnection(envResult.env.REDIS_URL);
  if (!redisResult.success) return redisResult.response;

  // Check rate limit
  const rateLimitResult = await checkRateLimit(request, envResult.env.REDIS_URL);
  if (!rateLimitResult.success) return rateLimitResult.response;

  // Prepare response data (validation already done above)
  const dataResult = prepareResponseData();

  const headers = buildStandardHeaders();
  return NextResponse.json(dataResult.payload, { headers });
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: buildStandardHeaders(),
  });
}