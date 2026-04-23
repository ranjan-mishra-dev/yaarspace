import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from '@/context/AuthProvider';
import { Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleGoogleLogin } from '@/services/handleGoogleLogin.js';


const Navbar = () => {

  const { user, handleLogout, userProfilePicture } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#FDFCF0]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FDFCF0]/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to='/' className="flex items-center gap-2">
          <img 
            src="https://n2r5uux6k5.ucarecd.net/436cd9c5-c41d-4555-b415-3fb8b7daefff/-/preview/512x512/" 
            className="h-10 w-10" 
            alt="Logo" 
          />
          <span className="text-2xl font-bold text-[#064E3B] tracking-tight">YaarSpace</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#475569]">
          <a href="#features" className="hover:text-[#064E3B] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#064E3B] transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-[#064E3B] transition-colors">Testimonials</a>
          <a href="#about" className="hover:text-[#064E3B] transition-colors">About</a>
          {/* <Button className="bg-[#064E3B] text-white hover:bg-[#064E3B]/90 rounded-full px-6">
            Join Now
          </Button> */}

          {!user ? (
          
            <button onClick={handleGoogleLogin} className="bg-[#064E3B] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all">
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
                src={userProfilePicture} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-[#064E3B] object-cover"
              />
              <ChevronDown size={14} className={`text-[#475569] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-bold text-[#064E3B] truncate">{user.email}</p>
                </div>

                <Link to="/notifications" className="flex items-center gap-3 px-4 py-2 text-sm text-[#475569] hover:bg-[#FDFCF0] hover:text-[#064E3B]">
                  <Bell size={16} /> Notifications
                </Link>
                
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-[#475569] hover:bg-[#FDFCF0] hover:text-[#064E3B]">
                  <User size={16} /> My Profile
                </Link>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 mt-1 border-t border-gray-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-[#064E3B]" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;