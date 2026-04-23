import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthProvider';
import { getGreeting } from '@/utils/getGreeting';


const Hero = () => {
  const {user} = useAuth();
    const message = getGreeting(user?.user_metadata?.name.split(" ")[0])

  return (
    <section className="bg-[#FDFCF0] py-20 px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-2">
            {["CODE,", "CONNECT,", "CONQUER."].map((word) => (
              <h1 key={word} className="text-7xl md:text-9xl font-black italic leading-none text-[#064E3B] tracking-tighter">
                {word}
              </h1>
            ))}
          </div>
          <p className="text-[#475569] text-xl font-light tracking-[0.3em] uppercas mx-10">
            The fastest way to find, connect, and collaborate with top-tier student developers for your next hackathon.
          </p>
          {!user ? 
          <Button className="mx-10 h-14 px-10 text-lg font-bold bg-[#064E3B] text-[#FDFCF0] hover:scale-105 transition-transform uppercase tracking-widest rounded-b-full">
            Create Your Profile
          </Button>
          :
          <Button className="mx-10 h-14 px-10 text-sm font-bold bg-[#064E3B] text-[#FDFCF0] hover:scale-105 transition-transform uppercase tracking-widest rounded-b-full">
            {message}
          </Button>
          }
        </div>

        <div className="relative group mb-10">
          <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-all duration-500 group-hover:rotate-1">
            <img 
              src="https://n2r5uux6k5.ucarecd.net/1fadeec9-2dc8-4fc0-b0ba-04edbda7507e/-/preview/640x640/" 
              alt="Collaboration" 
              className="w-full h-[550px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-2xl border-l-8 border-[#064E3B] max-w-[240px]">
            <p className="text-[#064E3B] font-semibold italic text-lg leading-tight">
              Great things are never built alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;