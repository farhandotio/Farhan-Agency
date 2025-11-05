// App.jsx
import React from "react";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
// import ChatButton from "./components/chat/ChatButton";
// import ChatBox from "./components/chat/ChatBox";
import InitialLoader from "./components/common/InitialLoader";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative bg-bg text-text">
        <InitialLoader minDuration={900} />
        <Navbar />
        <div className="max-w-[1900px] mx-auto">
          <MainRoutes />
        </div>
        <Footer />

        {/* <ChatButton /> */}

        {/* <ChatBox /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
