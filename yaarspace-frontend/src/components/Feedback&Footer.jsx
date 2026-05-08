import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Mail, MapPin, Camera } from "lucide-react";
import { X } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const FeedbackFooter = () => (
  <footer className="flex justify-center items-center bg-[#FDFCF0] pt-24 px-6 border-t border-gray-100">
    <div className="container mx-auto">
      <div className="bg-white rounded-[3rem] p-12 text-center mb-24 border-2 border-dashed border-[#064E3B]/30">
        <h2 className="text-5xl font-black text-[#064E3B] mb-6">
          YOUR FEEDBACK MATTERS
        </h2>
        <p className="text-[#475569] text-xl mb-10 max-w-xl mx-auto">
          Help us build the most collaborative student ecosystem.
        </p>
        {/* <Button
          variant="outline"
          className="h-16 px-12 text-lg rounded-full border-2 border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-all"
        >
          Share Feedback
        </Button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc04UngZtSf0w0GZqQ1-CzzcK_Xu6lvgdAIeGAqA5HcCtkm6w/viewform?embedded=true"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="YaarSpace Feedback Form"
          >
            Loading…
          </iframe>
        </div> */}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-[#064E3B] px-6 py-5 text-white hover:bg-[#04382a]">
              Share Feedback
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[95vw] max-h-[80vh] max-w-5xl overflow-hidden rounded-2xl border-none bg-[#FDFCF0] p-0">
            {/* Top Header */}
            <div className="flex items-start justify-between border-b bg-white px-6 py-4">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#064E3B]">
                  What we can improve?
                </DialogTitle>

                <DialogDescription className="text-[#475569]">
                  Share bugs, suggestions, match-quality issues, or feature
                  ideas.
                </DialogDescription>
              </DialogHeader>

              <DialogClose asChild>
                <button className="rounded-full p-2 text-[#475569] hover:bg-[#FDFCF0] hover:text-[#064E3B]">
                  {/* <X className="h-5 w-5" /> */}
                </button>
              </DialogClose>
            </div>

            {/* Google Form */}
            <div className="h-[75vh] overflow-y-auto bg-white">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSc04UngZtSf0w0GZqQ1-CzzcK_Xu6lvgdAIeGAqA5HcCtkm6w/viewform?embedded=true"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="YaarSpace Feedback Form"
              >
                Loading…
              </iframe>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-200 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="https://n2r5uux6k5.ucarecd.net/436cd9c5-c41d-4555-b415-3fb8b7daefff/-/preview/512x512/"
              className="h-8 w-8"
              alt=""
            />
            <span className="text-xl font-bold text-[#064E3B]">YaarSpace</span>
          </div>
          <p className="text-sm text-[#475569]">
            Empowering students to build together, one project at a time.
          </p>
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <h4 className="font-bold text-[#064E3B] mb-4">Contact</h4>
          <p className="text-sm text-[#475569] flex items-center gap-2">
            <Mail size={16} /> student.yaarspace@gmail.com
          </p>
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <h4 className="font-bold text-[#064E3B] mb-4">Location</h4>
          <p className="text-sm text-[#475569] flex items-center gap-2">
            <MapPin size={16} /> Goregaon East, Mumbai, India
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-[#064E3B] mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/im-ranjan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-5 h-5 text-[#475569] cursor-pointer hover:text-[#064E3B]" />
            </a>
            <a
              href="https://www.linkedin.com/in/im-ranjan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera className="w-5 h-5 text-[#475569] cursor-pointer hover:text-[#064E3B]" />
            </a>
            <a
              href="https://www.linkedin.com/in/im-ranjan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-5 h-5 text-[#475569] cursor-pointer hover:text-[#064E3B]" />
            </a>{" "}
          </div>
        </div>
      </div>
      <p className="py-8 text-center text-xs text-[#475569] font-medium">
        © 2026 YaarSpace. All rights reserved.
      </p>
    </div>
  </footer>
);

export { FeedbackFooter };
