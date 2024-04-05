const express = require("express");
const app = express();
const http = require("http");

const { Server } = require("socket.io");

const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
 
// const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("socket id", socket.id);

  socket.on("send_message", (data) => {
    console.log("data", data);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("server is running on 3001");
});
