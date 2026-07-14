const chat_routes = require("../src/chat_routes");
const { Server } = require("socket.io");

let io;
let users = {};

module.exports.listen = function (server) {
  io = new Server(server, {
    cors: {
      origin: [
        "https://goal-mindset.netlify.app",
        "http://localhost:3000"
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", function (socket) {
    socket.emit("connected", "hello");

    socket.on("set_userId", ({ email }) => {
      if (!email) return;
      socket.userEmail = email;
      users[email] = socket.id;
    });

    socket.on("disconnect", () => {
      if (socket.userEmail && users[socket.userEmail] === socket.id) {
        delete users[socket.userEmail];
      }
    });

    chat_routes(socket, io, users);
  });
};