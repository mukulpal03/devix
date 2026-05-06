import { Socket } from "socket.io";

/**
 * Creates a higher-order function to handle socket events with common validation,
 * error handling, and optional rate limiting.
 * @param socket The socket instance to emit errors to.
 * @param projectId The project ID for validation.
 * @returns A function that takes an event name and a handler, returning a socket-compatible callback.
 */
export const createSocketHandler = (socket: Socket, projectId?: string) => {
  // Map to track event counts for rate limiting per socket
  const eventCounts = new Map<string, { count: number; lastReset: number }>();

  return <T>(
    eventName: string,
    handler: (payload: T) => Promise<void>,
    options: { rateLimit?: { max: number; windowMs: number } } = {},
  ) => {
    return async (payload: T) => {
      try {
        if (!projectId) throw new Error("Project ID is required");

        // Rate limiting check
        if (options.rateLimit) {
          const now = Date.now();
          const stats = eventCounts.get(eventName) || {
            count: 0,
            lastReset: now,
          };

          if (now - stats.lastReset > options.rateLimit.windowMs) {
            stats.count = 1;
            stats.lastReset = now;
          } else {
            stats.count++;
          }

          eventCounts.set(eventName, stats);

          if (stats.count > options.rateLimit.max) {
            socket.emit(`${eventName}Error`, {
              message: `Rate limit exceeded for ${eventName}. Maximum ${options.rateLimit.max} events per ${options.rateLimit.windowMs / 1000}s allowed.`,
              code: "RATE_LIMIT_EXCEEDED",
            });
            return;
          }
        }

        await handler(payload);
      } catch (error: any) {
        console.error(`Error during ${eventName}:`, error);
        socket.emit(`${eventName}Error`, {
          message: error.message || "An error occurred",
          code: error.code || "UNKNOWN_ERROR",
        });
      }
    };
  };
};
