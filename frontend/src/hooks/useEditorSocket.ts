import { useEffect } from "react";
import { editorSocket } from "../lib/socket";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { useEditorTabsStore } from "../store/editorTabsStore";

export const useEditorSocket = (projectId: string | undefined) => {
  const isConnected = useEditorSocketStore((s) => s.isConnected);
  const connect = useEditorSocketStore((s) => s.connect);
  const disconnect = useEditorSocketStore((s) => s.disconnect);
  const addTab = useEditorTabsStore((s) => s.addTab);

  useEffect(() => {
    if (projectId) {
      connect(projectId);
    }

    return () => {
      disconnect();
    };
  }, [projectId, connect, disconnect]);

  useEffect(() => {
    const handleReadFileSuccess = ({
      data,
      pathToFileOrDir,
    }: {
      data: string;
      pathToFileOrDir: string;
    }) => {
      const label = pathToFileOrDir.split("/").pop() || "Untitled";
      addTab({
        id: pathToFileOrDir,
        label,
        content: data,
      });
    };

    editorSocket.on("readFileSuccess", handleReadFileSuccess);

    return () => {
      editorSocket.off("readFileSuccess", handleReadFileSuccess);
    };
  }, [addTab]);

  const readFile = (path: string) => {
    editorSocket.emit("readFile", { pathToFileOrDir: path });
  };

  return { socket: editorSocket, isConnected, readFile };
};
