import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { FeedbackFooter } from '../components/Feedback&Footer.jsx';
import { useAuth } from '@/context/AuthProvider.jsx';
import { Loader2 } from "lucide-react";


export default function Homepage() {

  const {loading} = useAuth();

   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCF0]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
          <p className="text-sm text-gray-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCF0]">
      <Hero />
      <Features />
      <Testimonials />
      <FeedbackFooter />
    </main>
  );
}