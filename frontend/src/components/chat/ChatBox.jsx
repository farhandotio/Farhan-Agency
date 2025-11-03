// components/chat/ChatBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbX } from "react-icons/tb";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { closeChat } from "../../app/features/chat/chatSlice";

const ChatBox = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.chat.isOpen);
  const { user } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef(null);
  const listRef = useRef(null);

  // ===== Socket.io connect & load previous chat =====
  useEffect(() => {
    if (!user) return;
    
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));

    // previous chat fetch
    socket.emit("load_previous_chat", { userId: user.id }, (prevMessages) => {
      if (Array.isArray(prevMessages)) setMessages(prevMessages);
    });

    // new incoming message
    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // typing indicator
    socket.on("typing", ({ userId, typing }) => {
      if (userId !== user.id) setIsTyping(typing);
    });

    return () => socket.disconnect();
  }, [user]);

  // ===== Esc press to close =====
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") dispatch(closeChat());
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, dispatch]);

  // ===== Ensure portal root =====
  const portalRoot =
    document.getElementById("chat-portal") ||
    (() => {
      const el = document.createElement("div");
      el.id = "chat-portal";
      document.body.appendChild(el);
      return el;
    })();

  // ===== Auto-scroll =====
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping]);

  // ===== Send message =====
  const handleSend = () => {
    const text = input.trim();
    if (!text || !socketRef.current) return;

    const message = {
      senderId: user.id,
      senderRole: user.role,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // local update
    setMessages((prev) => [...prev, message]);

    // send to server
    socketRef.current.emit("private_message", message);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => dispatch(closeChat());

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-1100"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Chat Panel */}
          <motion.div
            className="fixed right-5 sm:right-7 md:right-10 bottom-20 w-[340px] sm:w-[380px] md:w-[420px] z-1200 rounded-2xl overflow-hidden shadow-2xl bg-hoverCardBg"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border">
              <p className="font-medium">Chat with us</p>
              <button onClick={handleClose} className="p-2 rounded-md">
                <TbX className="w-5 h-5 text-mutedText hover:text-text" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="h-64 p-3 overflow-y-auto bg-bg">
              {messages.length === 0 && (
                <div className="text-sm text-mutedText">
                  Hi! How can I help you today?
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.senderRole === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                      msg.senderRole === "user"
                        ? "text-text bg-cardBg"
                        : "text-text bg-primary/10"
                    }`}
                  >
                    {msg.text}
                    {msg.time && (
                      <div className="text-[10px] text-gray-500 mt-1 text-right">
                        {msg.time}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-lg text-sm bg-hoverCardBg text-text">
                    <span className="inline-block animate-pulse">
                      Typing...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-lg border px-3 py-2 text-sm input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 rounded-lg bg-primary text-white text-sm"
              >
                Send
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default ChatBox;
