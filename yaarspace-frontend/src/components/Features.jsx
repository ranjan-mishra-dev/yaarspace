import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Search, MessageSquare } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "1. Build Your Profile",
      desc: "Auto-import from GitHub, showcase your coding profiles and skills.",
      icon: <UserCircle className="w-12 h-12 text-[#064E3B]" />,
    },
    {
      title: "2. Discover Teammates",
      desc: "Search by college name, tech stack, or skill and see their details.",
      icon: <Search className="w-12 h-12 text-[#064E3B]" />,
    },
    {
      title: "3. Connect & Chat",
      desc: "Request connections, chat 1-on-1, or start a collaborative video room.",
      icon: <MessageSquare className="w-12 h-12 text-[#064E3B]" />,
    },
  ];

  return (
    <section id="features" className="py-10 bg-white px-6">
      <h1 className="text-center my-10 text-5xl font-bold leading-tight">
        What you get
      </h1>
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <Card
            key={i}
            className="bg-[#FDFCF0] border-none shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex items-center justify-center pt-10">
              {f.icon}
            </CardHeader>
            <CardContent className="text-center pb-10">
              <CardTitle className="text-[#064E3B] text-2xl mb-4">
                {f.title}
              </CardTitle>
              <p className="text-[#475569] leading-relaxed">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
