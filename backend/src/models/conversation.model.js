// src/models/conversation.model.js
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    messages: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        senderRole: { type: String, enum: ["user", "admin"], required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    lastMessage: { type: String },
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("conversation", conversationSchema);

export default conversationModel;
