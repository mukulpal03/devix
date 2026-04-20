import { useEffect, useCallback } from "react";
import { shellSocket } from "../lib/socket";
import { useShellSocketStore } from "../store/shellSocketStore";

export const useShellSocket = (projectId: string | undefined) => {
  const isConnected = useShellSocketStore((s) => s.isConnected);
  const connect = useShellSocketStore((s) => s.connect);
  const disconnect = useShellSocketStore((s) => s.disconnect);

  useEffect(() => {
    if (projectId) {
      connect(projectId);
    }

    return () => {
      disconnect();
    };
  }, [projectId, connect, disconnect]);

  const sendData = useCallback((data: string) => {
    if (shellSocket.connected) {
      shellSocket.emit("terminalData", data);
    }
  }, []);

  const onData = useCallback((callback: (data: string) => void) => {
    shellSocket.on("terminalData", callback);
    return () => {
      shellSocket.off("terminalData", callback);
    };
  }, []);

  return { isConnected, sendData, onData };
};
