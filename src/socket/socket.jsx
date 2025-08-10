// import { io, Socket } from "socket.io-client";

// let socket = null;

// export const connectSocket = (token) => {
//   if (!socket) {
//     socket = io("http://192.168.88.97:7000", {
//       auth: {
//         token: token,
//       },
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 500,
//       transports: ["websocket"],
//     });
//   }
//   return socket;
// };

// export const getSocket = () => socket;

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.emit("manual_disconnect");
//     socket.disconnect();
//     socket = null;
//   }
// };




// socketClient.js
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
      timeout: 20000, // Wait 20s before giving up
      transports: ["websocket", "polling"], // allow fallback
      forceNew: true, // always create fresh connection
      secure: true, // for HTTPS/WSS
    });

    // // Debug connection events
    // socket.on("connect", () => {
    //   console.log("✅ Socket connected:", socket.id);
    // });

    // socket.on("disconnect", (reason) => {
    //   console.warn("⚠️ Socket disconnected:", reason);
    // });

    // socket.on("connect_error", (error) => {
    //   console.error("❌ Socket connection error:", error.message);
    // });

    // socket.on("error", (err) => {
    //   console.error("❌ Socket error:", err);
    // });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.emit("manual_disconnect");
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket disconnected manually");
  }
};