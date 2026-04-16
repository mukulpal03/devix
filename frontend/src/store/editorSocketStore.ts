import { create } from "zustand";
import { editorSocket } from "../lib/socket";

interface EditorSocketStore {
  isConnected: boolean;
  connect: (projectId: string) => void;
  disconnect: () => void;
}

export const useEditorSocketStore = create<EditorSocketStore>((set) => {
  editorSocket.on("connect", () => set({ isConnected: true }));
  editorSocket.on("disconnect", () => set({ isConnected: false }));

  return {
    isConnected: editorSocket.connected,

    connect: (projectId) => {
      const currentQuery = editorSocket.io.opts.query as any;

      if (currentQuery?.projectId !== projectId) {
        if (editorSocket.connected) {
          editorSocket.disconnect();
        }
        editorSocket.io.opts.query = { ...currentQuery, projectId };
      }

      if (!editorSocket.connected) {
        editorSocket.connect();
      }
    },

    disconnect: () => {
      if (editorSocket.connected) {
        editorSocket.disconnect();
      }
    },
  };
});
