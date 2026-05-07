import { createServer } from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PORT } from "./config/server";
import { DockerService } from "./services/docker";
import { IdleContainerReaper } from "./services/reaper";
import { WatcherReaper } from "./socket/watcher-reaper";

// Global Error Handlers - Prevents the server from crashing on unhandled promise rejections
// or unexpected exceptions that occur outside of request contexts.
process.on("uncaughtException", (err) => {
  console.error("[CRITICAL] Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[CRITICAL] Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

const server = createServer(app);

initSocket(server);

(async () => {
  await DockerService.ensureNetwork();
  await DockerService.ensureImage();
  IdleContainerReaper.start();
})();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");

  // Force exit after 5 seconds to prevent hanging
  const timeout = setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 5000);

  // Stop background services
  IdleContainerReaper.stop();
  WatcherReaper.stop();

  server.close(() => {
    console.log("Server closed");
    clearTimeout(timeout);
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
