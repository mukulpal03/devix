import { createServer } from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PORT } from "./config/server";
import { DockerService } from "./services/docker";
import { IdleContainerReaper } from "./services/reaper";

// Global Error Handlers - Prevents the server from crashing on unhandled promise rejections
// or unexpected exceptions that occur outside of request contexts.
process.on("uncaughtException", (err) => {
  console.error("[CRITICAL] Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[CRITICAL] Unhandled Rejection at:", promise, "reason:", reason);
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
