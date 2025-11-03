import http from "http";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import initialSocketServer from "./src/sockets/socket.server.js";

connectDB(); // MongoDB connect

const server = http.createServer(app); // Express + HTTP server

initialSocketServer(server); // Socket.io attach

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
