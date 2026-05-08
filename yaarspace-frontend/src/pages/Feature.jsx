import {
  Search,
  UserPlus,
  MessageCircle,
  Bell,
  BadgeCheck,
  Video,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const features = [
  {
    icon: Search,
    title: "Smart Teammate Search",
    desc: "Find students by skills, college, role, and interests for hackathons or projects.",
  },
  {
    icon: UserPlus,
    title: "Connection Requests",
    desc: "Send, accept, or reject requests before starting a conversation.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    desc: "Chat instantly with accepted connections using a clean and fast interface.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get notified about requests, accepted connections, and new messages.",
  },
  {
    icon: BadgeCheck,
    title: "GitHub Profile Import",
    desc: "Import GitHub details to make your profile more trustworthy and developer-focused.",
  },
  {
    icon: Video,
    title: "Video Call Rooms",
    desc: "Future-ready feature to create rooms and collaborate with your hackathon team.",
  },
];

const Features = () => {
  return (
    <section className="min-h-screen bg-[#FDFCF0] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-[#064E3B] text-white hover:bg-[#064E3B]">
            YaarSpace Features
          </Badge>

          <h1 className="text-3xl font-bold text-[#064E3B] md:text-5xl">
            Everything you need to find the right teammates
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#475569] md:text-base">
            YaarSpace helps students discover, connect, and collaborate with
            like-minded builders for hackathons, projects, and learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="border border-[#064E3B]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#064E3B]/10">
                    <Icon className="h-6 w-6 text-[#064E3B]" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-[#064E3B]">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#475569]">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
        <Link to={'/search-people'}>
          <Button className="rounded-full bg-[#064E3B] px-8 py-6 text-white hover:bg-[#04382a]">
            Start Finding Teammates
          </Button>
        </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;