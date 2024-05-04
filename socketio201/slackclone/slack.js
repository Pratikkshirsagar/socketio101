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

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    socket.on("joinRoom", async (roomToJoin, callback) => {
      const rooms = socket.rooms;

      let i = 0;
      rooms.forEach((room) => {
        if (i !== 0) {
          socket.leave(room);
        }
        i++;
      });

      console.log(roomToJoin);
      socket.join(roomToJoin);
      const sockets = await io
        .of(namespace.endpoint)
        .in(roomToJoin)
        .fetchSockets();
      const socketCount = sockets.length;
      callback({ numUsers: socketCount });
    });
  });
});
