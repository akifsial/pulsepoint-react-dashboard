import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io("https://phpstack-1250693-5681983.cloudwaysapps.com/public/", {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000, 
      transports: ["websocket", "polling"], 
      forceNew: true,
      secure: true,   
    });

  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.emit("manual_disconnect");
    socket.disconnect();
    socket = null;
  }
};