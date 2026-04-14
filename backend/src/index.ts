import { createServer } from "http";
import app from "./app";
import { initSocket } from "./socket";
import { PORT } from "./config/server";

const server = createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
