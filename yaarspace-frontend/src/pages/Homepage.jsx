import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { FeedbackFooter } from '../components/Feedback&Footer.jsx';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-[#FDFCF0]">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Testimonials />
      <FeedbackFooter />
    </main>
  );
}