const { authenticateSocket } = require("../middlewares/socket-auth-middleware");
const { messageQueries, roomQueries } = require("../db");

const chatHandler = (io) => {
  const chatNamespace = io.of("/chat");

  chatNamespace.use(authenticateSocket);

  chatNamespace.on("connection", async (socket) => {
    console.log("New connection from " + socket.user.username);
    try {
      const publicRoom = await roomQueries.getRoomByName("Public");
      const messages = await messageQueries.getMessages(publicRoom.id);
      socket.emit("receiveHistory", messages);
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = { chatHandler };
