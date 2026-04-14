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
    const projectId = socket.handshake.query.projectId as string;
    
    if (projectId) {
      console.log(`User ${socket.id} connected to project: ${projectId}`);
      socket.join(projectId);
    } else {
      console.log(`User ${socket.id} connected without projectId`);
    }

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });

  return io;
};
