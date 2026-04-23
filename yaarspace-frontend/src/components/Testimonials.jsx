import React from 'react';
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from './StarRating';


const TestimonialSection = () => {
  const items = [
  {
    "name": "Arjun Mehta",
    "rating": 5,
    "role": "Frontend Engineer",
    "text": "Video call feature made it so easy to vibe-check my teammates before the hackathon started. Highly recommended!",
    "profile_picture": "https://images.pexels.com/photos/7972568/pexels-photo-7972568.jpeg"
  },
  {
    "name": "Priya Sharma",
    "rating": 5,
    "role": "UI/UX Designer",
    "text": "Found a group that actually values design. We formed our team in minutes and won 'Best Design' at our last event!",
    "profile_picture": "https://images.pexels.com/photos/16504592/pexels-photo-16504592.jpeg"
  },
  {
    "name": "Venu Thalapati",
    "rating": 5,
    "role": "Full Stack Dev",
    "text": "Found my MERN team here! The chat interface is seamless for discussing project architecture.",
    "profile_picture": "https://images.pexels.com/photos/33887551/pexels-photo-33887551.jpeg"
  },
  {
    "name": "Aman Verma",
    "rating": 4.5,
    "role": "Backend Developer",
    "text": "Great platform to find people who are actually serious about shipping code. The tech-stack filtering is a lifesaver.",
    "profile_picture": "https://images.pexels.com/photos/15237424/pexels-photo-15237424.jpeg"
  },
  {
    "name": "Sneha Kapoor",
    "rating": 4,
    "role": "AI/ML Enthusiast",
    "text": "Finally a place where I can find developers to help turn my Python scripts into a full-fledged SaaS product.",
    "profile_picture": "https://images.pexels.com/photos/8147480/pexels-photo-8147480.jpeg"
  },
  {
    "name": "Vikram Singh",
    "rating": 5,
    "role": "Mobile Dev",
    "text": "The team formation tool is intuitive. Met two React Native devs here and we've been building together ever since.",
    "profile_picture": "https://images.pexels.com/photos/11114960/pexels-photo-11114960.jpeg"
  }
];

  return (
    <div className="overflow-hidden w-full py-10 bg-[#FDFCF0]">
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
              <Avatar className="w-12 h-12 border-2 border-[#064E3B]/10">
                <AvatarImage src={t.profile_picture} alt={t.name} />
                <AvatarFallback className="bg-[#064E3B]/10 text-[#064E3B] font-bold">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col">
                <p className="font-bold text-[#064E3B] leading-none mb-1">{t.name}</p>
                <p className="text-xs text-[#475569] font-medium uppercase tracking-wider">{t.role}</p>
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