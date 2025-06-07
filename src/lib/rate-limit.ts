interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  keyGenerator: (identifier: string) => string // Function to generate cache key
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Different rate limit configurations
export const RATE_LIMITS = {
  // API endpoints - more generous for dashboard connections
  API_GENERAL: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 1000, // 1000 requests per hour
    keyGenerator: (apiKey: string) => `api:${apiKey}`
  },
  API_QUERY: {
    windowMs: 60 * 60 * 1000, // 1 hour  
    maxRequests: 500, // 500 queries per hour
    keyGenerator: (apiKey: string) => `query:${apiKey}`
  },
  // Downloads - much more restrictive
  DOWNLOAD: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // Only 10 downloads per hour per IP
    keyGenerator: (ip: string) => `download:${ip}`
  },
  DOWNLOAD_PER_USER: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 3, // Only 3 downloads per 15 min per IP
    keyGenerator: (ip: string) => `download_burst:${ip}`
  }
} as const

export class RateLimiter {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  async checkLimit(identifier: string): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
    retryAfter?: number
  }> {
    const key = this.config.keyGenerator(identifier)
    const now = Date.now()
    
    // Clean up expired entries periodically
    this.cleanup()
    
    let entry = rateLimitStore.get(key)
    
    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      entry = {
        count: 1,
        resetTime: now + this.config.windowMs
      }
      rateLimitStore.set(key, entry)
      
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: entry.resetTime
      }
    }
    
    if (entry.count >= this.config.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000) // seconds until reset
      }
    }
    
    // Increment counter
    entry.count++
    rateLimitStore.set(key, entry)
    
    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime
    }
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }
}

// Pre-configured rate limiters
export const apiGeneralLimiter = new RateLimiter(RATE_LIMITS.API_GENERAL)
export const apiQueryLimiter = new RateLimiter(RATE_LIMITS.API_QUERY)
export const downloadLimiter = new RateLimiter(RATE_LIMITS.DOWNLOAD)
export const downloadBurstLimiter = new RateLimiter(RATE_LIMITS.DOWNLOAD_PER_USER)

// Helper function to get client IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

// Helper to create rate limit response headers
export function createRateLimitHeaders(result: {
  remaining: number
  resetTime: number
  retryAfter?: number
}) {
  const headers = new Headers()
  headers.set('X-RateLimit-Remaining', result.remaining.toString())
  headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString())
  
  if (result.retryAfter) {
    headers.set('Retry-After', result.retryAfter.toString())
  }
  
  return headers
} 