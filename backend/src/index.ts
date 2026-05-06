import { createServer } from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PORT } from "./config/server";
import { DockerService } from "./services/docker";
import { IdleContainerReaper } from "./services/reaper";

const server = createServer(app);

initSocket(server);

(async () => {
  await DockerService.ensureNetwork();
  IdleContainerReaper.start();
})();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
