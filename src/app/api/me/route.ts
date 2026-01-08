import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { EXPERIENCE, PROJECTS, SOCIAL_LINKS, STACK } from "@/lib/constants";
import { createClient, type RedisClientType } from "redis";

type MeStatus = "operational" | "open_to_work";

const NAME = "Barry Henry";
const STATUS: MeStatus = "operational";
const DOCUMENTATION_URL = "https://barryhenry.com/docs";

const envSchema = z.object({
  REDIS_URL: z.string().url().optional(),
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


let redisClient: RedisClientType | null = null;
let redisConnectPromise: Promise<void> | null = null;

// Simple in-memory rate limiter for development/portfolio use
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);


// Note: In serverless environments (Vercel, Railway, etc.), each function invocation
// may run in a fresh runtime, making global variables unreliable for caching.
// The redis package handles connection pooling automatically, but cached clients
// and rate limiters may not persist between invocations, potentially causing
// reconnection overhead. This design prioritizes correctness over optimization
// in serverless contexts where connection pooling benefits may be limited.

async function getRedisClient(redisUrl: string): Promise<RedisClientType> {
  // Check if we have a client and if it's still in a valid connected state
  if (redisClient == null || !redisClient.isOpen || !redisClient.isReady) {
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
    redisClient.on("error", (err) => {
      console.warn('Redis client error:', err.message);
    });

    redisClient.on("connect", () => {
      console.log('Redis connected successfully');
    });

    redisClient.on("ready", () => {
      console.log('Redis client ready');
    });

    redisClient.on("end", () => {
      console.log('Redis connection ended');
      redisClient = null;
      redisConnectPromise = null;
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
          redisUrl: redisUrl.replace(/\/\/[^:]*:[^@]*@/, '//***:***@'), // Mask credentials in logs
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
    }
  }
}

// Simple in-memory rate limiting function
function checkRateLimitInMemory(key: string, maxRequests: number, windowMs: number): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or expired window
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return { allowed: false, resetTime: entry.resetTime };
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(key, entry);
  return { allowed: true };
}

async function validateEnvironment(): Promise<{ success: false; response: NextResponse } | { success: true; env: { REDIS_URL?: string } }> {
  const envValidation = envSchema.safeParse({
    REDIS_URL: process.env.REDIS_URL || undefined,
  });

  if (!envValidation.success) {
    const headers = buildStandardHeaders();
    return {
      success: false,
      response: NextResponse.json(
        { error: "Server misconfigured: REDIS_URL invalid" },
        { status: 500, headers }
      )
    };
  }

  return { success: true, env: envValidation.data };
}

async function validateRedisConnection(redisUrl?: string): Promise<{ success: false; response: NextResponse } | { success: true; redisAvailable: boolean }> {
  // If no Redis URL is provided, skip Redis validation and use in-memory rate limiting
  if (!redisUrl) {
    console.log('Redis URL not provided, using in-memory rate limiting');
    return { success: true, redisAvailable: false };
  }

  const headers = buildStandardHeaders();

  try {
    await ensureRedisConnected(redisUrl);
    return { success: true, redisAvailable: true };
  } catch (error) {
    // Log detailed error information for debugging
    console.error('Redis connection validation failed:', {
      error: error instanceof Error ? error.message : String(error),
      redisUrl: redisUrl.replace(/\/\/[^:]*:[^@]*@/, '//***:***@'), // Mask credentials in logs
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

async function checkRateLimit(request: NextRequest): Promise<{ success: false; response: NextResponse } | { success: true }> {
  const headers = buildStandardHeaders();

  const ip = getClientIp(request);
  const isAnonymous = ip == null;

  // Log anonymous client access for monitoring
  if (isAnonymous) {
    console.info("Anonymous client access (applying strict rate limiting):", {
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date().toISOString(),
      path: request.nextUrl.pathname
    });
  }

  // Use IP for identified clients, shared key for anonymous clients
  const rateLimitKey = isAnonymous ? "anonymous_clients" : ip;

  // Apply rate limiting: 10 requests/minute for identified, 1 request/minute for anonymous
  const maxRequests = isAnonymous ? 1 : 10;
  const windowMs = 60 * 1000; // 1 minute

  const result = checkRateLimitInMemory(rateLimitKey, maxRequests, windowMs);

  if (!result.allowed) {
    const retryAfterSeconds = Math.max(1, Math.ceil((result.resetTime! - Date.now()) / 1000));
    headers.set("Retry-After", retryAfterSeconds.toString());

    return {
      success: false,
      response: NextResponse.json(
        { error: "Too Many Requests" },
        { status: 429, headers }
      )
    };
  }

  return { success: true };
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
  // Validate that the first experience exists and has required properties
  const firstExperience = EXPERIENCE[0];
  if (!firstExperience || typeof firstExperience !== 'object' || !('role' in firstExperience)) {
    throw new Error('Server misconfigured: First experience entry is invalid or missing role property');
  }
  const title = firstExperience.role;

  // Validate that the first project exists and is a valid object
  const latestProject = PROJECTS[0];
  if (!latestProject || typeof latestProject !== 'object') {
    throw new Error('Server misconfigured: First project entry is invalid');
  }

  const stack = STACK.filter((item) => item.proficiency === "Expert").map(
    (item) => item.name
  );

  const payload = {
    name: NAME,
    status: STATUS,
    title,
    stack,
    latest_project: latestProject,
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

  // Validate Redis connection (expensive operation, optional)
  const redisResult = await validateRedisConnection(envResult.env.REDIS_URL);
  if (!redisResult.success) return redisResult.response;

  // Apply rate limiting (always enabled, uses in-memory store when Redis unavailable)
  const rateLimitResult = await checkRateLimit(request);
  if (!rateLimitResult.success) return rateLimitResult.response;

  // Prepare response data (validation already done above)
  const dataResult = prepareResponseData();

  const headers = buildStandardHeaders();
  return NextResponse.json(dataResult.payload, { headers });
}

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const headers = buildStandardHeaders();

  // Apply rate limiting to OPTIONS requests to prevent abuse
  // Note: Uses Redis if available, otherwise rate limiting is skipped
  try {
    // Only apply rate limiting if Redis URL is actually configured
    if (process.env.REDIS_URL) {
      const envValidation = envSchema.safeParse({
        REDIS_URL: process.env.REDIS_URL,
      });

      if (envValidation.success) {
        const rateLimitResult = await checkRateLimit(request);
        if (!rateLimitResult.success) {
          return rateLimitResult.response;
        }
      }
    } else {
      console.log('Skipping OPTIONS rate limiting - Redis not configured');
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