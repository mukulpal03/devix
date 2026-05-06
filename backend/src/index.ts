import { createServer } from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PORT } from "./config/server";
import { DockerService } from "./services/docker";

const server = createServer(app);

initSocket(server);

(async () => {
  await DockerService.ensureNetwork();
})();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
