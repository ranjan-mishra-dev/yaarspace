import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/ProfileSetup.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "sonner";
import SearchPage from "./pages/SearchPage.jsx";
import Requests from "./pages/Requests.jsx";
import Chat from "./pages/Chat.jsx";
import Features from "./pages/Feature.jsx";
import HowItWorks from "./pages/HowItWorks";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Toaster position="top-right" richColors /> */}
      <Toaster position="top-right" richColors closeButton duration={2000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/search-people" element={<SearchPage />} />
        </Route>
        
        <Route path="/requests" element={<Requests />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </div>
  );
};

export default App;
