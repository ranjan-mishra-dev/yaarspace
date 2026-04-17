import React from "react";
import { Star } from "lucide-react";
import StarRating from "../components/StarRating.jsx";

const Testimonials = () => {
  const items = [
    {
      name: "Ranjan Mishra",
      rating: 5,
      role: "Full Stack Dev",
      text: "Found my MERN team here!",
    },
    {
      name: "Anjali P.",
      rating: 5,
      role: "UI/UX Designer",
      text: "Matching with devs is seamless.",
    },
    {
      name: "Rohit K.",
      rating: 4.5,
      role: "SDE Aspirant",
      text: "The video rooms are super helpful.",
    },
    {
      name: "Ranjan Mishra",
      rating: 4.5,
      role: "raju",
      text: "Found my MERN team here!",
    },
    {
      name: "Rohit K.",
      rating: 4,
      role: "kaju",
      text: "The video rooms are super helpful.",
    },
  ];

  return (
    <section className="bg-[#064E3B] py-24 overflow-hidden">
      <div className="text-center mb-5">
        <h2 className="text-[#FDFCF0] text-4xl font-black uppercase tracking-widest">
          Rated by Community
        </h2>

        <h4 className="text-[#FDFCF0] text-xl font-thin mt-2 tracking-widest opacity-20">
          Student Feedback
        </h4>
      </div>

      <div className="flex animate-scroll gap-8">
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="min-w-[350px] bg-[#FDFCF0] p-8 rounded-2xl shadow-xl"
          >
            {/* <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="#064E3B" className="text-[#064E3B]" />)}
            </div> */}
            <StarRating rating={t.rating} />
            <p className="text-[#475569] text-lg italic mb-6">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#064E3B]/10 flex items-center justify-center font-bold text-[#064E3B]">
                {t.name[0]}
              </div>
              <div>
                <p className="font-bold text-[#064E3B]">{t.name}</p>
                <p className="text-xs text-[#475569]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 25s linear infinite; width: max-content; }
      `}</style>
    </section>
  );
};

export default Testimonials;
