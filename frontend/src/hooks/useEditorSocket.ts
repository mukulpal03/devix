import { useEffect } from "react";
import { editorSocket } from "../lib/socket";
import { useEditorSocketStore } from "../store/editorSocketStore";

export const useEditorSocket = (projectId: string | undefined) => {
  const isConnected = useEditorSocketStore((s) => s.isConnected);
  const connect = useEditorSocketStore((s) => s.connect);
  const disconnect = useEditorSocketStore((s) => s.disconnect);

  useEffect(() => {
    if (projectId) {
      connect(projectId);
    }

    return () => {
      disconnect();
    };
  }, [projectId, connect, disconnect]);

  return { socket: editorSocket, isConnected };
};
