import http from "http";
import { WebSocket, WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.send(
    JSON.stringify({
      content: "Welcome to the chat!",
      sender: "system",
    })
  );

  ws.on("message", (data: Buffer) => {
    const message = data.toString();
    console.log("Received:", message);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            content: message,
            sender: "user",
            timestamp: Date.now(),
          })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
