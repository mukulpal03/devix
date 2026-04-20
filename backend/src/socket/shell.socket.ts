import { Socket, Namespace } from "socket.io";
import { handleShellSocketEvents } from "./handlers/shell";

export const handleShellNamespace = (namespace: Namespace) => {
  namespace.on("connection", (socket: Socket) => {
    console.log("User connected to shell", socket.id);

    const projectId = socket.handshake.query.projectId as string;
    console.log(`User connected to shell namespace. Project ID: ${projectId || "None"}`);

    if (projectId) {
      socket.join(projectId);
      console.log(`User ${socket.id} joined shell room: ${projectId}`);
    } else {
      console.warn("No projectId provided in shell socket handshake query.");
    }

    handleShellSocketEvents(socket);

    socket.on("disconnect", () => {
      console.log("User disconnected from shell", socket.id);
    });
  });
};
