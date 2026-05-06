import { Socket } from "socket.io";
import { createSocketHandler } from "../utils";

export const handleShellSocketEvents = (
  socket: Socket,
  stream: any,
  projectId: string,
) => {
  const handleEvent = createSocketHandler(socket, projectId);

  stream.on("data", (data: Buffer) => {
    socket.emit("terminalData", data.toString());
  });

  socket.on(
    "terminalData",
    handleEvent<string>(
      "terminalData",
      async (data: string) => {
        stream.write(data);
      },
      { rateLimit: { max: 50, windowMs: 1000 } },
    ),
  );

  socket.on("disconnect", () => {
    stream.end();
  });
};
