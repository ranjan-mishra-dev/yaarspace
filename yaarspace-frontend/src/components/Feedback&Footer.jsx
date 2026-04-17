import React from 'react';
import { Button } from "@/components/ui/button";
import {  Mail, MapPin, Camera } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";


const FeedbackFooter = () => (
  <footer className="bg-[#FDFCF0] pt-24 px-6 border-t border-gray-100">
    <div className="container mx-auto">
      <div className="bg-white rounded-[3rem] p-12 text-center mb-24 border-2 border-dashed border-[#064E3B]/30">
        <h2 className="text-5xl font-black text-[#064E3B] mb-6">YOUR FEEDBACK MATTERS</h2>
        <p className="text-[#475569] text-xl mb-10 max-w-xl mx-auto">Help us build the most collaborative student ecosystem.</p>
        <Button 
          variant="outline" 
          className="h-16 px-12 text-lg rounded-full border-2 border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all"
        >
          Share Feedback
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="https://n2r5uux6k5.ucarecd.net/ac32fa8a-1507-4149-853f-4d81afc28459/-/preview/512x512/" className="h-8 w-8" alt="" />
            <span className="text-xl font-bold text-[#064E3B]">YaarSpace</span>
          </div>
          <p className="text-sm text-[#475569]">Empowering students to build together, one project at a time.</p>
        </div>
        <div>
          <h4 className="font-bold text-[#064E3B] mb-4">Contact</h4>
          <p className="text-sm text-[#475569] flex items-center gap-2"><Mail size={16}/> hello@yaarspace.com</p>
        </div>
        <div>
          <h4 className="font-bold text-[#064E3B] mb-4">Location</h4>
          <p className="text-sm text-[#475569] flex items-center gap-2"><MapPin size={16}/> Tech Hub, India</p>
        </div>
        <div>
          <h4 className="font-bold text-[#064E3B] mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <FaTwitter className="w-5 h-5 text-[#475569] cursor-pointer hover:text-[#064E3B]" />
            <Camera className="w-5 h-5 text-[#475569] cursor-pointer hover:text-[#064E3B]" />
            <FaLinkedin className="w-5 h-5 text-[#475569] cursor-pointer hover:text-[#064E3B]" />
          </div>
        </div>
      </div>
      <p className="py-8 text-center text-xs text-[#475569] font-medium">
        © 2026 YaarSpace. All rights reserved. Designed for SDE Excellence.
      </p>
    </div>
  </footer>
);

export { FeedbackFooter };