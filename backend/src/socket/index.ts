import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import chokidar from "chokidar";
import path from "path";

export const initSocket = (server: HttpServer) => {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  const editorNamespace = io.of("/editor");

  editorNamespace.on("connection", (socket) => {
    console.log("User connected to editor", socket.id);

    let projectId = "";

    if (projectId) {
      var watcher = chokidar.watch(`./projects/${projectId}`, {
        ignored: (path) => path.includes("node_modules"),
        persistent: true, // Keeps the watcher in running state till the time the server is running
        ignoreInitial: true, // Don't emit events for files that already exist when the watcher is created
        awaitWriteFinish: {
          stabilityThreshold: 2000, // Wait for 2 seconds after the last write event to emit the event
        },
      });

      watcher.on("all", (event, path) => {
        console.log(event, path);
      });
    }

    socket.on("message", (data) => {
      console.log("Message from editor", data);
    });

    socket.on("disconnect", async () => {
      await watcher.close();
      console.log("User disconnected from editor", socket.id);
    });
  });

  return io;
};
