import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { handleEditorNamespace } from "./editor.socket";
import { handleShellNamespace } from "./shell.socket";

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
  handleEditorNamespace(editorNamespace);

  const shellNamespace = io.of("/shell");
  handleShellNamespace(shellNamespace);

  return io;
};
