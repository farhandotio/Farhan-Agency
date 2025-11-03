import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counters/counterSlice";
import authReducer from "./features/auth/authSlice";
import chatReducer from "./features/chat/chatSlice";

const store = configureStore({
  reducer: {
    counters: counterReducer,
    auth: authReducer,
    chat: chatReducer
  },
});

export default store;
