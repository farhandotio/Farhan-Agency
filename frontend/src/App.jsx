// App.jsx
import React from "react";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
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
      </div>
    </BrowserRouter>
  );
};

export default App;
