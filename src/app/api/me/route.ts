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

// Extend globalThis to include our cleanup interval
declare global {
  var redisCleanupInterval: NodeJS.Timeout | undefined;
}

// Note: In serverless environments like Railway, Redis connections are managed
// automatically by the platform and the redis package. We rely on Railway's
// connection pooling and Redis's built-in timeouts rather than manual cleanup.

async function getRedisClient(redisUrl: string): Promise<RedisClientType> {
  if (redisClient == null) {
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries: number): number | false => {
          // Allow up to 10 retries with increasing delays
          if (retries > 10) return false; // Stop after 10 retries

          // Exponential backoff: 1s, 2s, 4s, 8s, 15s, 30s, 60s, 120s, 240s, 300s
          const delay = Math.min(Math.pow(2, retries) * 1000, 300000); // Cap at 5 minutes
          return delay;
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

  // Use an immediately invoked async function to ensure atomic connection initialization
  // This prevents race conditions where multiple requests could create separate connection promises
  if (redisConnectPromise == null) {
    redisConnectPromise = (async (): Promise<void> => {
      try {
        await client.connect();
      } catch (err) {
        // Log connection failure for debugging
        console.error('Redis connection failed:', {
          error: err instanceof Error ? err.message : String(err),
          redisUrl: redisUrl.replace(/:[^:]*@/, ':***@'), // Mask password in logs
          timestamp: new Date().toISOString()
        });

        await closeRedisConnection();
        throw err;
      }
    })();
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
      // Ensure Redis connection is established before creating rate limiter
      await ensureRedisConnected(redisUrl);
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
    // Ensure Redis connection is established before creating rate limiter
    await ensureRedisConnected(redisUrl);
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

  // For anonymous clients, skip rate limiting but log for monitoring
  if (isAnonymous) {
    console.info("Anonymous client access (no rate limiting):", {
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date().toISOString(),
      path: request.nextUrl.pathname
    });
    return { success: true };
  }

  // For identified clients, apply normal rate limiting
  try {
    const limiter = await getRateLimiter(redisUrl, false);

    // Check if Redis client is still connected before using rate limiter
    const client = await getRedisClient(redisUrl);
    if (!client.isOpen || !client.isReady) {
      console.warn("Redis client not ready for rate limiting, skipping");
      return { success: true }; // Allow request but log the issue
    }

    await limiter.consume(ip);
    return { success: true };
  } catch (error: unknown) {
    if (!isRateLimiterRes(error)) {
      console.error("Unexpected error during rate limiting:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        redisUrl: redisUrl.replace(/:[^:]*@/, ':***@'), // Mask password in logs
        timestamp: new Date().toISOString()
      });

      // If rate limiting fails due to Redis issues, allow the request
      // This prevents the API from being completely unusable due to rate limiting problems
      console.warn("Rate limiting failed, allowing request to proceed");
      return { success: true };
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

  // Validate server data integrity (fast check before expensive Redis operations)
  const dataValidation = validateServerData();
  if (!dataValidation.success) return dataValidation.response;

  // Validate Redis connection (expensive operation)
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

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const headers = buildStandardHeaders();

  // Apply rate limiting to OPTIONS requests to prevent abuse
  // Note: This requires REDIS_URL to be available at runtime
  try {
    const envValidation = envSchema.safeParse({
      REDIS_URL: process.env.REDIS_URL,
    });

    if (envValidation.success) {
      const rateLimitResult = await checkRateLimit(request, envValidation.data.REDIS_URL);
      if (!rateLimitResult.success) {
        return rateLimitResult.response;
      }
    }
    // If Redis is not configured, allow OPTIONS requests to prevent CORS issues
  } catch {
    // If rate limiting fails, still allow OPTIONS to prevent blocking legitimate CORS preflights
  }

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}