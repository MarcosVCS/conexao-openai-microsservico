import rateLimit from "express-rate-limit";

export class RateLimitMiddleware {
  private rateLimiter;

  constructor(maxRequestsPerMinute: number) {
    this.rateLimiter = rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: maxRequestsPerMinute,
      message: "Request limit exceeded. Please wait a moment and try again.",
    });
  }

  protect() {
    return this.rateLimiter;
  }
}
