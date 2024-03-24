const http = require("node:http");

const webSocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("I am connected!");
});

const wss = new webSocket.WebSocketServer({ server });

wss.on("headers", (headers) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  ws.send("Welcome to web sockets server!");
  ws.on("message", (data) => {
    console.log(data.toString());
  });
});

server.listen(8000);
