import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export const initSocket = (server: HttpServer) => {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });

  return io;
};
