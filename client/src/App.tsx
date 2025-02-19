import React from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";

const App: React.FC = () => {
  const { isConnected, messages, sendMessage } = useWebSocket();

  return (
    <div className="flex p-4 h-screen justify-center items-end bg-zinc-800">
      <div className="flex flex-col space-y-3 w-full max-w-md">
        <div
          className={`text-center text-sm ${
            isConnected ? "text-green-400" : "text-red-400"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </div>

        <div className="flex flex-col p-4 border border-zinc-500 h-[500px] bg-white rounded-lg overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ul className="flex flex-col space-y-3">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </ul>
          </div>
        </div>

        <ChatInput onSend={sendMessage} isConnected={isConnected} />
      </div>
    </div>
  );
};

export default App;
