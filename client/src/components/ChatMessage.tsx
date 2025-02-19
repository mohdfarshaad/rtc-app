import React from "react";
import { Message } from "../types/chat";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <li className="p-4 bg-zinc-100 rounded-lg break-words">{message.content}</li>
);
