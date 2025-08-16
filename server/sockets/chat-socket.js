const { authenticateSocket } = require("../middlewares/socket-auth-middleware");

const chatHandler = (io) => {
  const chatNamespace = io.of("/chat");

  chatNamespace.use(authenticateSocket);

  chatNamespace.on("connection", (socket) => {
    console.log("New connection from " + socket.user.username);
  });
};

module.exports = { chatHandler };
