import {
  Search,
  UserPlus,
  Bell,
  MessageCircle,
  Pencil,
  Trash2,
  Video,
  Users,
  Code2,
  GraduationCap,
  Link as LinkIcon,
  Keyboard,
  UserRoundCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: UserRoundCheck,
    title: "Create a Strong Profile",
    desc: "Add your education, skills, role, GitHub, portfolio, LeetCode, and other profile links so people can understand your background before connecting.",
  },
  {
    icon: Search,
    title: "Search People",
    desc: "Search students based on skills, college name, interests, or project needs. You can add multiple skills by typing a skill and pressing Enter.",
  },
  {
    icon: UserPlus,
    title: "Send Connection Request",
    desc: "If you find a suitable teammate, send a connection request. They can accept or reject your request.",
  },
  {
    icon: Bell,
    title: "Get Notified",
    desc: "When someone accepts your request, you will receive a notification that you both are now ready to chat.",
  },
  {
    icon: MessageCircle,
    title: "Start Real-Time Chat",
    desc: "After connection acceptance, that person appears at the top of your chat inbox and you can start real-time messaging.",
  },
  {
    icon: Pencil,
    title: "Edit Messages",
    desc: "Sent something wrong? You can edit your message and update it instantly in the chat.",
  },
  {
    icon: Trash2,
    title: "Delete for Everyone",
    desc: "You can delete a message for everyone, and it will disappear from both users’ chat screens.",
  },
  {
    icon: Video,
    title: "Future Video Calls",
    desc: "Soon, connected users will be able to do 1-to-1 video calls or create group rooms for hackathon teams.",
  },
];

const profileTips = [
  {
    icon: Code2,
    title: "Add Skills",
    desc: "Mention skills like React, Node.js, Java, UI/UX, AI/ML, DSA, or DevOps.",
  },
  {
    icon: GraduationCap,
    title: "Add Education",
    desc: "Your college, branch, and year help others identify relevant teammates.",
  },
  {
    icon: LinkIcon,
    title: "Add Profile Links",
    desc: "GitHub, portfolio, LinkedIn, and LeetCode make your profile more trustworthy.",
  },
  {
    icon: Keyboard,
    title: "Add Multiple Skills",
    desc: "Type a skill and press Enter to add more skills to your profile or search query.",
  },
];

const HowItWorks = () => {
  return (
    <section className="min-h-screen bg-[#FDFCF0] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <Badge className="mb-4 bg-[#064E3B] text-white hover:bg-[#064E3B]">
            How YaarSpace Works
          </Badge>

          <h1 className="text-3xl font-bold text-[#064E3B] md:text-5xl">
            Find teammates, connect, and collaborate faster
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[#475569] md:text-base">
            YaarSpace helps students discover like-minded people for hackathons,
            projects, learning, and collaboration through smart search,
            connection requests, notifications, and real-time chat.
          </p>
        </div>

        {/* Main Steps */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={index}
                className="border border-[#064E3B]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#064E3B]/10">
                      <Icon className="h-6 w-6 text-[#064E3B]" />
                    </div>

                    <span className="text-sm font-semibold text-[#475569]/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-[#064E3B]">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#475569]">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search Flow Section */}
        <div className="mt-16 rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Badge className="mb-4 bg-[#064E3B]/10 text-[#064E3B] hover:bg-[#064E3B]/10">
                Smart Search Flow
              </Badge>

              <h2 className="text-2xl font-bold text-[#064E3B] md:text-3xl">
                Search by skill or college
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#475569] md:text-base">
                Users can search people based on technical skills, college name,
                interests, or preferred roles. Matching profiles become visible
                in a clean card layout with profile image, name, college, skills,
                and profile links.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge className="bg-[#FDFCF0] text-[#064E3B] hover:bg-[#FDFCF0]">
                  React
                </Badge>
                <Badge className="bg-[#FDFCF0] text-[#064E3B] hover:bg-[#FDFCF0]">
                  Node.js
                </Badge>
                <Badge className="bg-[#FDFCF0] text-[#064E3B] hover:bg-[#FDFCF0]">
                  UI/UX
                </Badge>
                <Badge className="bg-[#FDFCF0] text-[#064E3B] hover:bg-[#FDFCF0]">
                  Java
                </Badge>
                <Badge className="bg-[#FDFCF0] text-[#064E3B] hover:bg-[#FDFCF0]">
                  Parul University
                </Badge>
              </div>
            </div>

            <Card className="border border-[#064E3B]/10 bg-[#FDFCF0] shadow-none">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Search className="h-5 w-5 text-[#064E3B]" />
                  <h3 className="font-semibold text-[#064E3B]">
                    Example Search
                  </h3>
                </div>

                <div className="rounded-2xl border border-[#064E3B]/10 bg-white p-4">
                  <p className="text-sm text-[#475569]">Search teammates by:</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#064E3B] px-3 py-1 text-xs text-white">
                      React
                    </span>
                    <span className="rounded-full bg-[#064E3B] px-3 py-1 text-xs text-white">
                      Backend
                    </span>
                    <span className="rounded-full bg-[#064E3B] px-3 py-1 text-xs text-white">
                      Same College
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-[#475569]">
                    Tip: Type a skill and press{" "}
                    <span className="font-semibold text-[#064E3B]">Enter</span>{" "}
                    to add more skills.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Tips */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#064E3B] md:text-3xl">
              Make your profile easy to trust
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#475569] md:text-base">
              The better your profile, the better your chances of getting
              discovered and accepted by the right teammates.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {profileTips.map((tip, index) => {
              const Icon = tip.icon;

              return (
                <Card
                  key={index}
                  className="border border-[#064E3B]/10 bg-white shadow-sm"
                >
                  <CardContent className="p-6">
                    <Icon className="mb-4 h-7 w-7 text-[#064E3B]" />

                    <h3 className="mb-2 font-semibold text-[#064E3B]">
                      {tip.title}
                    </h3>

                    <p className="text-sm leading-6 text-[#475569]">
                      {tip.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Future Video Call Section */}
        <div className="mt-16 rounded-3xl bg-[#064E3B] p-8 text-center text-white md:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Users className="h-7 w-7" />
          </div>

          <h2 className="text-2xl font-bold md:text-3xl">
            Coming Soon: Video Rooms for Hackathon Teams
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
            After connecting with teammates, users will be able to create rooms
            for 1-to-1 video calls or group video calls with hackathon teams.
            This will make collaboration faster and more real.
          </p>

          <Button
            asChild
            className="mt-7 rounded-full bg-white px-8 py-6 text-[#064E3B] hover:bg-[#FDFCF0]"
          >
            <Link to="/profile">Build Your Profile</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;