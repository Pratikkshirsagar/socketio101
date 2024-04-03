const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8080);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  socket.emit("messageFromServer", { data: "welcome to socket.io" });
  socket.on("messageFromClient", (data) => {
    console.log(data);
  });
});
