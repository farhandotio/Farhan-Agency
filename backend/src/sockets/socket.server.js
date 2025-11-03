import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import conversationModel from "../models/conversation.model.js";
import userModel from "../models/user.model.js";
import config from "../config/config.js";

function initialSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  // ===== Socket Authentication =====
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Authentication error: token missing"));

      const payload = jwt.verify(token, config.JWT_SECRET);
      const user = await userModel.findById(payload.id).select("fullname email role");

      if (!user) return next(new Error("Authentication error: user not found"));

      socket.user = { id: user._id.toString(), role: user.role };
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Socket connected ${socket.id} user=${socket.user.id} role=${socket.user.role}`);

    // Join personal room
    socket.join(`user:${socket.user.id}`);

    // Admin room
    if (socket.user.role === "admin") socket.join("admins");

    // User sends message
    socket.on("private_message", async ({ text }) => {
      if (!text) return;

      try {
        // Find conversation (auto-create for user)
        let conversation = await conversationModel.findOne({ userId: socket.user.id });
        if (!conversation) conversation = await conversationModel.create({ userId: socket.user.id });

        // Add message
        const msg = { senderId: socket.user.id, senderRole: socket.user.role, text };
        conversation.messages.push(msg);
        conversation.lastMessage = text;
        await conversation.save();

        // Emit to user & admin
        io.to(`user:${socket.user.id}`).emit("new_message", msg);
        io.to("admins").emit("new_message", { ...msg, userId: socket.user.id });
      } catch (err) {
        console.error("Message send error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected", socket.id);
    });
  });
}

export default initialSocketServer;
