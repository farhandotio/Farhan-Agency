import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ChatButton from "./components/chat/ChatButton";

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
      </div>
    </BrowserRouter>
  );
};

export default App;
