// src/context/ConversationContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "./socket";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = (token) => {
    if (!token) return;

    socket.auth = { token };

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.connect();
  };

  const disconnectSocket = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  // ✅ Auto-connect if token exists (e.g., from localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token"); // or sessionStorage / cookie

    if (token) {
      connectSocket(token);
    }

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  return (
    <ConversationContext.Provider
      value={{ connectSocket, disconnectSocket, isConnected }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
