import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#FDFCF0]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FDFCF0]/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <img 
            src="https://n2r5uux6k5.ucarecd.net/436cd9c5-c41d-4555-b415-3fb8b7daefff/-/preview/512x512/" 
            className="h-10 w-10" 
            alt="Logo" 
          />
          <span className="text-2xl font-bold text-[#064E3B] tracking-tight">YaarSpace</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#475569]">
          <a href="#features" className="hover:text-[#064E3B] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#064E3B] transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-[#064E3B] transition-colors">Testimonials</a>
          <a href="#about" className="hover:text-[#064E3B] transition-colors">About</a>
          <Button className="bg-[#064E3B] text-white hover:bg-[#064E3B]/90 rounded-full px-6">
            Join Now
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-[#064E3B]" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;