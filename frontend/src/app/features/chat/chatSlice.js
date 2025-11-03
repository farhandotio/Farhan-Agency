import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  messages: [],
  isTyping: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    addMessage: (state, action) => {
      state.messages.push({
        sender: action.payload.sender,
        text: action.payload.text,
        time: new Date().toLocaleTimeString(),
      });
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { openChat, closeChat, addMessage, setTyping, clearChat } =
  chatSlice.actions;

export default chatSlice.reducer;
