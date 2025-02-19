import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isConnected: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isConnected,
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex border border-zinc-500 bg-white rounded-lg overflow-hidden">
      <input
        type="text"
        className="flex-1 p-3 focus:outline-none bg-zinc-50 text-black text-lg"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="px-6 bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 transition-colors"
        onClick={handleSend}
        disabled={!isConnected || !input.trim()}
      >
        <Send size={20} />
      </button>
    </div>
  );
};
