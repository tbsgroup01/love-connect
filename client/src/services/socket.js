import { io } from "socket.io-client";

let socketInstance = null;
let currentToken = null;

export const getSocket = (token) => {
  if (!token) {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
      currentToken = null;
    }
    return null;
  }

  if (socketInstance && currentToken === token) {
    return socketInstance;
  }

  if (socketInstance) {
    socketInstance.disconnect();
  }

  currentToken = token;
  const rawApiUrl = (import.meta.env.VITE_API_URL || "").trim();
  let socketUrl = window.location.origin;

  if (rawApiUrl.startsWith("http")) {
    socketUrl = rawApiUrl.replace(/\/api\/?$/, "");
  }

  socketInstance = io(socketUrl, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  return socketInstance;
};

export default getSocket;
