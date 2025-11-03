// src/routes/conversation.routes.js
import express from "express";
import { VerifyToken, isAdmin, isUser } from "../middlewares/auth.middlewares.js";
import * as conversationController from "../controllers/conversation.controller.js";

const router = express.Router();

// User gets own conversation
router.get("/me", VerifyToken, isUser, conversationController.getUserConversation);

// Admin gets all conversations
router.get("/all", VerifyToken, isAdmin, conversationController.getAllConversations);

export default router;
