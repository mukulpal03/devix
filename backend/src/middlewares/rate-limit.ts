import rateLimit from "express-rate-limit";

/**
 * Global rate limiter for all API requests.
 * Limits each IP to 100 requests per 15 minutes.
 */
export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for project creation.
 * Limits each IP to 5 project creations per hour.
 */
export const projectCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15,
  message: {
    status: 429,
    message: "Too many projects created from this IP, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
