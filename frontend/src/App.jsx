// App.jsx
import React from "react";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ChatButton from "./components/chat/ChatButton";
import ChatBox from "./components/chat/ChatBox";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <div className="max-w-[1900px] mx-auto">
          <MainRoutes />
        </div>
        <Footer />

        {/* Chat Button */}
        <ChatButton />

        {/* Chat Box (reads open-state from Redux) */}
        <ChatBox />
      </div>
    </BrowserRouter>
  );
};

export default App;
