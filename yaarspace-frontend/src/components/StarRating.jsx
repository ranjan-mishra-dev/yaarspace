import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating = 4.5 }) => {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, j) => {
        const index = j + 1;
        
        // Full Star
        if (index <= Math.floor(rating)) {
          return (
            <Star key={j} size={18} fill="#064E3B" className="text-[#064E3B]" />
          );
        }
        
        // Half Star (Logic for 0.5)
        if (index === Math.ceil(rating) && rating % 1 !== 0) {
          return (
            <div key={j} className="relative">
              {/* Empty Star Background */}
              <Star size={18} className="text-[#064E3B] opacity-30" />
              {/* Half Star Overlay */}
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <Star size={18} fill="#064E3B" className="text-[#064E3B]" />
              </div>
            </div>
          );
        }

        // Empty Star
        return (
          <Star key={j} size={18} className="text-[#064E3B] opacity-30" />
        );
      })}
    </div>
  );
};

export default StarRating;