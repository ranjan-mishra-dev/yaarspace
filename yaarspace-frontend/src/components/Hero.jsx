import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-[#FDFCF0] py-20 px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-2">
            {["CODE.", "CONNECT.", "CONQUER."].map((word) => (
              <h1 key={word} className="text-7xl md:text-9xl font-black italic leading-none text-[#064E3B] tracking-tighter">
                {word}
              </h1>
            ))}
          </div>
          <p className="text-[#475569] text-xl font-light tracking-[0.3em] uppercase">
            The fastest way to find, connect, and collaborate with top-tier student developers for your next hackathon.
          </p>
          <Button className="h-14 px-10 text-lg font-bold bg-[#064E3B] text-[#FDFCF0] hover:scale-105 transition-transform uppercase tracking-widest rounded-none">
            Create Profile
          </Button>
        </div>

        <div className="relative group">
          <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-all duration-500 group-hover:rotate-1">
            <img 
              src="https://n2r5uux6k5.ucarecd.net/7935d813-baba-46ec-a727-4aa6c34a26d8/-/preview/640x427/" 
              alt="Collaboration" 
              className="w-full h-[550px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-2xl border-l-8 border-[#064E3B] max-w-[240px]">
            <p className="text-[#064E3B] font-semibold italic text-lg leading-tight">
              "Great things are never built alone."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;