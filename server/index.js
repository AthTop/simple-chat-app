require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoute = require("./routes/api-routes");
const { createServer } = require("https");
const fs = require("fs");
const { Server } = require("socket.io");
const { chatHandler } = require("./sockets/chat-socket");
const { roomQueries } = require("./db");

// Seed a public room in the DB
(async () => {
  try {
    await roomQueries.seedPublicRoom();
    console.log("Public room seeded");
  } catch (e) {
    console.error("Failed to create public room", e);
    process.exit(1);
  }
})();

// Read certs
try {
  const key = fs.readFileSync("./key.pem");
  const cert = fs.readFileSync("./cert.pem");
  // App setup
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/", apiRoute);

  const PORT = process.env.PORT || 3000;

  const httpsServer = createServer({ key, cert }, app);

  const io = new Server(httpsServer, {
    cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] },
  });

  chatHandler(io);

  httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server listening on port ${PORT}`);
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}
