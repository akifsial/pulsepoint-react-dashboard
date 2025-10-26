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
    });

    socket.connect();
  };

  const disconnectSocket = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); 

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
