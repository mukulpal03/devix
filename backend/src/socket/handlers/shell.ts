import { Socket } from "socket.io";

export const handleShellSocketEvents = (socket: Socket) => {
  socket.on("terminalData", (data: string) => {
    // For now, simply echo the data back to the same socket
    // This allows the frontend to verify input/output flow
    socket.emit("terminalData", data);
    
    // Optionally log to backend console for debugging
    // console.log(`Shell Data [${socket.id}]:`, data);
  });
};
