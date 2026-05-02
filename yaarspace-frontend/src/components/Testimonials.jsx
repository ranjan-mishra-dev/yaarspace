import React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "./StarRating";
import { items } from "../data/testimonials.js";
import { MessageCircleHeart } from "lucide-react";

const TestimonialSection = () => {
  return (
    <div className="overflow-hidden w-full py-10 bg-[#FDFCF0]">
      

      <div className="flex flex-col items-center justify-center text-center mb-10 px-4">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <MessageCircleHeart className="h-7 w-7" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          Feedback from our <span className="text-green-600">coders</span>
        </h1>

        <p className="mt-3 max-w-xl text-sm sm:text-base text-gray-500">
          Real stories from developers who found their perfect hackathon
          teammates.
        </p>
      </div>
      <div className="flex animate-scroll gap-8 px-4">
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="w-[calc(100vw/3.5)] min-w-[320px] md:w-[calc(100vw/3.5)] lg:w-[calc((100vw-6rem)/3)] bg-white p-8 rounded-2xl shadow-sm border border-[#064E3B]/5 flex flex-col justify-between"
          >
            <div>
              <StarRating rating={t.rating} />
              <p className="text-[#475569] text-lg italic mb-8 leading-relaxed">
                {t.text}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24 border-2 border-[#064E3B]/10">
                <AvatarImage src={t.profile_picture} alt={t.name} />
                <AvatarFallback className="bg-[#064E3B]/10 text-[#064E3B] font-bold">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="font-bold text-[#064E3B] leading-none mb-1">
                  {t.name}
                </p>
                <p className="text-xs text-[#475569] font-medium uppercase tracking-wider">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(calc(-50% - 1rem)); } 
        }
        .animate-scroll { 
          animation: scroll 35s linear infinite; 
          display: flex;
          width: max-content; 
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;
