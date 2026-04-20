import { create } from "zustand";
import { shellSocket } from "../lib/socket";

interface ShellSocketStore {
  isConnected: boolean;
  connect: (projectId: string) => void;
  disconnect: () => void;
}

export const useShellSocketStore = create<ShellSocketStore>((set) => {
  shellSocket.on("connect", () => set({ isConnected: true }));
  shellSocket.on("disconnect", () => set({ isConnected: false }));

  return {
    isConnected: shellSocket.connected,

    connect: (projectId) => {
      const currentQuery = shellSocket.io.opts.query as any;

      if (currentQuery?.projectId !== projectId) {
        if (shellSocket.connected) {
          shellSocket.disconnect();
        }
        shellSocket.io.opts.query = { ...currentQuery, projectId };
      }

      if (!shellSocket.connected) {
        shellSocket.connect();
      }
    },

    disconnect: () => {
      if (shellSocket.connected) {
        shellSocket.disconnect();
      }
    },
  };
});
