import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Bell, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthProvider.jsx";
import { Loader2 } from "lucide-react";

import { handleGoogleLogin } from "@/services/handleGoogleLogin.js";

const Navbar = () => {
  const { user, handleLogout, loading, userProfilePicture } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCF0]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
          <p className="text-sm text-gray-600">
            Loading your picture...
          </p>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-[#FDFCF0] border-b px-6 py-4 flex justify-between items-center relative">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://n2r5uux6k5.ucarecd.net/436cd9c5-c41d-4555-b415-3fb8b7daefff/-/preview/512x512/"
          className="h-8 w-8"
          alt="YaarSpace"
        />
        <span className="text-xl font-bold text-[#064E3B]">YaarSpace</span>
      </Link>

      <div className="flex items-center gap-6">
        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-[#475569] font-medium">
          <Link to="/features">Features</Link>
          <Link to="/how-it-works">How it works</Link>
          {user ? <Link to="/search-people">Search</Link> : " "}
        </div>

        {/* AUTHENTICATION LOGIC */}
        {!user ? (
          <button
            onClick={handleGoogleLogin}
            className="bg-[#064E3B] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all cursor-pointer"
          >
            Join Now
          </button>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* Profile Circle */}
            <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-all">
              <img
                src={userProfilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-[#064E3B] object-cover"
              />
              <ChevronDown
                size={14}
                className={`text-[#475569] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-bold text-[#064E3B] truncate">
                    {user.email}
                  </p>
                </div>

                <Link
                  to="/notifications"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[#475569] hover:bg-[#FDFCF0] hover:text-[#064E3B]"
                >
                  <Bell size={16} /> Notifications
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-[#475569] hover:bg-[#FDFCF0] hover:text-[#064E3B]"
                >
                  <User size={16} /> My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold 
             text-red-600 transition-all duration-200 
             hover:bg-red-50 hover:pl-5 active:scale-[0.98]
             cursor-pointer mt-1 border-t border-gray-100 group"
                >
                  <LogOut
                    size={16}
                    className="cursor-pointer transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
