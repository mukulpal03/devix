import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PORT } from "./config/server";
import { DockerService } from "./services/docker";
import { IdleContainerReaper } from "./services/reaper";
import { WatcherReaper } from "./socket/watcher-reaper";
import { TemplateService } from "./services/templates";
import { handleUpgrade } from "./middlewares/preview-proxy";

process.on("uncaughtException", (err) => {
  console.error("[CRITICAL] Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "[CRITICAL] Unhandled Rejection at:",
    promise,
    "reason:",
    reason,
  );
  process.exit(1);
});

const server = createServer(app);

server.on("upgrade", async (req, socket, head) => {
  const handled = await handleUpgrade(req, socket, head);
  if (handled) return;
  // If not handled by proxy, let Socket.IO or other handlers process it
});

initSocket(server);

(async () => {
  await DockerService.ensureNetwork();
  await DockerService.ensureImage();
  await TemplateService.ensureTemplates();
  IdleContainerReaper.start();
})();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");

  // Force exit after 5 seconds to prevent hanging
  const timeout = setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down",
    );
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
