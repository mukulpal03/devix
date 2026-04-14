import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useSocketContext } from "../app/providers/SocketProvider";

export const useSocket = () => {
  const { isConnected } = useSocketContext();
  return { socket, isConnected };
};

export const useProjectSocket = (projectId: string | undefined) => {
  const { isConnected, connect, disconnect } = useSocketContext();

  useEffect(() => {
    if (projectId) {
      connect(projectId);
    }

    return () => {
      disconnect();
    };
  }, [projectId, connect, disconnect]);

  return { socket, isConnected };
};
