import React from "react";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-[1900px] mx-auto">
        <MainRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
