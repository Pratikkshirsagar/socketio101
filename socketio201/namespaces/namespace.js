const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id);
  // socket.emit("messageFromServer", { data: "Welcome to the socket server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
    io.emit("newMessageToClient", { text: dataFromClient.text });
  });
});
