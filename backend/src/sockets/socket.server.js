import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import conversationModel from "../models/conversation.model.js";
import userModel from "../models/user.model.js";
import config from "../config/config.js";
import cookie from "cookie";

function initialSocketServer(httpServer) {
  const origin =
    config.NODE_ENV === "production"
      ? "https://farhanagency.vercel.app"
      : "http://localhost:5173";

  const io = new Server(httpServer, {
    cors: {
      origin, // dynamic origin
      methods: ["GET", "POST"],
      credentials: true, // allow cookies
    },
  });

  // ===== Socket Authentication via cookies =====
  io.use(async (socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) return next(new Error("Authentication error: no cookies"));

      const parsedCookies = cookie.parse(cookies);
      const token = parsedCookies.token; // name of your cookie storing JWT
      if (!token) return next(new Error("Authentication error: token missing"));

      const payload = jwt.verify(token, config.JWT_SECRET);
      const user = await userModel
        .findById(payload.id)
        .select("fullname email role");
      if (!user) return next(new Error("Authentication error: user not found"));

      socket.user = { id: user._id.toString(), role: user.role };
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(
      `🟢 Socket connected ${socket.id} user=${socket.user.id} role=${socket.user.role}`
    );

    // Join personal room
    socket.join(`user:${socket.user.id}`);

    // Admin room
    if (socket.user.role === "admin") socket.join("admins");

    // ===== Load previous conversation =====
    socket.on("load_previous_chat", async (_, callback) => {
      try {
        let conversation = await conversationModel.findOne({
          userId: socket.user.id,
        });
        if (!conversation)
          conversation = await conversationModel.create({
            userId: socket.user.id,
          });

        callback(conversation.messages || []);
      } catch (err) {
        console.error("Load previous chat error:", err.message);
        callback([]);
      }
    });

    // ===== Typing indicator =====
    socket.on("typing", ({ typing }) => {
      if (socket.user.role !== "admin") {
        socket.to("admins").emit("typing", { userId: socket.user.id, typing });
      }
    });

    // ===== User sends message =====
    socket.on("private_message", async (message) => {
      if (!message?.text) return;

      try {
        let conversation = await conversationModel.findOne({
          userId: socket.user.id,
        });
        if (!conversation)
          conversation = await conversationModel.create({
            userId: socket.user.id,
          });

        const msg = {
          senderId: message.senderId || socket.user.id,
          senderRole: message.senderRole || socket.user.role,
          text: message.text,
          time: message.time || new Date().toISOString(),
        };

        conversation.messages.push(msg);
        conversation.lastMessage = msg.text;
        await conversation.save();

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
