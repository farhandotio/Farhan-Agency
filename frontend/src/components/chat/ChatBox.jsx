// components/chat/ChatBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChat,
  addMessage,
  setTyping,
  clearChat,
} from "../../app/features/chat/chatSlice";

const ChatBox = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.chat.isOpen);
  const messages = useSelector((s) => s.chat.messages);
  const isTyping = useSelector((s) => s.chat.isTyping);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  // Esc press to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") dispatch(closeChat());
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, dispatch]);

  // Ensure portal root exists
  const portalRoot =
    document.getElementById("chat-portal") ||
    (() => {
      const el = document.createElement("div");
      el.id = "chat-portal";
      document.body.appendChild(el);
      return el;
    })();

  // auto-scroll to bottom
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleClose = () => {
    dispatch(closeChat());
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    // add user message
    dispatch(addMessage({ sender: "user", text }));

    // simulate typing + bot reply
    dispatch(setTyping(true));
    setInput("");

    setTimeout(() => {
      dispatch(setTyping(false));
      dispatch(addMessage({ sender: "bot", text: "Got your message ✅" }));
    }, 700);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-1100"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.div
            className="fixed right-5 sm:right-7 md:right-10 bottom-20 w-[340px] sm:w-[380px] md:w-[420px] z-1200 rounded-2xl overflow-hidden shadow-2xl bg-white"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()} // prevent backdrop click
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  {/* icon */}
                  <svg
                    className="w-5 h-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm1 11h4v2h-4v3l-4-4h4v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Chat with us</p>
                  <p className="text-xs text-gray-500">
                    Usually replies within a few minutes
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <TbX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div
              ref={listRef}
              className="h-64 p-3 overflow-y-auto bg-gray-50"
            >
              {/* placeholder messages */}
              {messages.length === 0 ? (
                <div className="text-sm text-gray-600">
                  Hi! How can I help you today?
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={msg.id ?? `${msg.sender}-${i}`}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-800"
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
                ))
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-lg text-sm bg-gray-200 text-gray-800">
                    <span className="inline-block animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-3 border-t bg-white flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
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
