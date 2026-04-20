import { Socket, Namespace } from "socket.io";
import { handleShellSocketEvents } from "./handlers/shell";
import { DockerService } from "../services/docker";

export const handleShellNamespace = (namespace: Namespace) => {
  namespace.on("connection", (socket: Socket) => {
    console.log("User connected to shell", socket.id);

    const projectId = socket.handshake.query.projectId as string;
    console.log(
      `User connected to shell namespace. Project ID: ${projectId || "None"}`,
    );

    if (projectId) {
      socket.join(projectId);
      console.log(`User ${socket.id} joined shell room: ${projectId}`);

      // Ensure image exists and start container
      (async () => {
        try {
          await DockerService.ensureImage();
          const container = await DockerService.getOrCreateContainer(projectId);
          const stream = await DockerService.createShellStream(container.id);

          handleShellSocketEvents(socket, stream);
        } catch (error) {
          console.error("Failed to setup docker shell:", error);
          socket.emit(
            "terminalData",
            "\x1b[31mError: Failed to connect to sandbox container.\x1b[0m\r\n",
          );
        }
      })();
    } else {
      console.warn("No projectId provided in shell socket handshake query.");
    }

    socket.on("disconnect", () => {
      console.log("User disconnected from shell", socket.id);
      DockerService.stopContainer(projectId);
    });
  });
};
