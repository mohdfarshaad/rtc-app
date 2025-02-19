import { useState, useEffect, useCallback } from "react";
import { Message } from "../types/chat";

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    const handleOpen = () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    const handleClose = () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    };

    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", handleClose);
    ws.addEventListener("error", handleError);

    setSocket(ws);

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("close", handleClose);
      ws.removeEventListener("error", handleError);
      ws.close();
    };
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN && message.trim()) {
        socket.send(message.trim());
        return true;
      }
      return false;
    },
    [socket]
  );

  return {
    isConnected,
    messages,
    sendMessage,
  };
};
