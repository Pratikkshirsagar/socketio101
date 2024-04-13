const express = require("express");
const socketio = require("socket.io");
const namespaces = require("./data/namespaces");

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.emit("welcom", "Welcome to the socket server");
  socket.on("clientConnect", () => {
    console.log(socket.id, "has connected");
  });
  socket.emit("nsList", namespaces);
});
