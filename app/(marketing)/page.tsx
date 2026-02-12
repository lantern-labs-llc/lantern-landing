import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhyNow from "@/components/landing/WhyNow";
import HowItWorks from "@/components/landing/HowItWorks";
import PayForPerformance from "@/components/landing/PayForPerformance";
import BusinessTypes from "@/components/landing/BusinessTypes";
import Team from "@/components/landing/Team";
import WaitlistCTA from "@/components/landing/WaitlistCTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyNow />
      <HowItWorks />
      <PayForPerformance />
      <BusinessTypes />
      <Team />
      <WaitlistCTA />
      <Footer />
    </div>
  );
}
