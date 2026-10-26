/**
 * Fixed-window, in-memory rate limiter keyed by client IP.
 * Good for a single Node.js instance. On serverless or multi-instance hosting, swap the Map
 * for a shared store (Redis / Upstash / a database) behind the same interface.
 */
type Bucket = { count: number; resetAt: number };

export type RateLimiter = {
  check(key: string, now?: number): { allowed: boolean; remaining: number; retryAfterSeconds: number };
  reset(): void;
};

export function createRateLimiter({ max, windowMs }: { max: number; windowMs: number }): RateLimiter {
  const buckets = new Map<string, Bucket>();
  return {
    check(key, now = Date.now()) {
      // Opportunistic cleanup so the map cannot grow without bound.
      if (buckets.size > 10_000) {
        for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      }
      let bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= now) {
        bucket = { count: 0, resetAt: now + windowMs };
        buckets.set(key, bucket);
      }
      bucket.count += 1;
      const allowed = bucket.count <= max;
      return {
        allowed,
        remaining: Math.max(0, max - bucket.count),
        retryAfterSeconds: allowed ? 0 : Math.ceil((bucket.resetAt - now) / 1000),
      };
    },
    reset() {
      buckets.clear();
    },
  };
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
