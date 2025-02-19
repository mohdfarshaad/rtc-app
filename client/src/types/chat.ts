export interface Message {
  content: string;
  sender: string;
  timestamp?: number;
}

export interface WebSocketMessage {
  type: "message" | "system";
  content: string;
  timestamp: number;
}
