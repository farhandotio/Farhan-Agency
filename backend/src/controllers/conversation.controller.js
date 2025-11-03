// src/controllers/conversation.controller.js
import conversationModel from "../models/conversation.model.js";

// Get all conversations (Admin view)
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await conversationModel
      .find()
      .populate("userId", "fullname email role")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single user's conversation
export const getUserConversation = async (req, res) => {
  try {
    let conversation = await conversationModel.findOne({ userId: req.user._id });
    if (!conversation) {
      conversation = await conversationModel.create({ userId: req.user._id });
    }
    res.json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
