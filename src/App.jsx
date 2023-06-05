import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
