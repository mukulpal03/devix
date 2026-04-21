import { Socket, Namespace } from "socket.io";
import { handleEditorSocketEvents } from "./handlers/editor";
import { ProjectWatcherService } from "./watcher";

export const handleEditorNamespace = (namespace: Namespace) => {
  namespace.on("connection", (socket: Socket) => {
    console.log("User connected to editor", socket.id);

    const projectId = socket.handshake.query.projectId as string;
    console.log(`User connected to editor namespace. Project ID: ${projectId || "None"}`);

    if (projectId) {
      socket.join(projectId);
      ProjectWatcherService.watchProject(projectId, namespace);
    } else {
      console.warn("No projectId provided in socket handshake query.");
    }

    handleEditorSocketEvents(socket);

    socket.on("disconnect", async () => {
      if (projectId) {
        await ProjectWatcherService.unwatchProject(projectId);
      }
      console.log("User disconnected from editor", socket.id);
    });
  });
};
