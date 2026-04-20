import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
const SOCKET_URL = API_URL.replace("/api", "");

export const editorSocket = io(`${SOCKET_URL}/editor`, {
  autoConnect: false,
  transports: ["websocket"],
});

export const shellSocket = io(`${SOCKET_URL}/shell`, {
  autoConnect: false,
  transports: ["websocket"],
});
