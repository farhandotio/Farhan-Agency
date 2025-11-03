import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  messages: [],
  isTyping: false,
  socket: null,
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
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { openChat, closeChat, setSocket, addMessage, setTyping, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
