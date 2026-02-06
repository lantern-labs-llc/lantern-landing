import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhyNow from "@/components/landing/WhyNow";
import HowItWorks from "@/components/landing/HowItWorks";
import PayForPerformance from "@/components/landing/PayForPerformance";
import BusinessTypes from "@/components/landing/BusinessTypes";
import Team from "@/components/landing/Team";
import WaitlistCTA from "@/components/landing/WaitlistCTA";
import Footer from "@/components/landing/Footer";
import { DoodleSectionBridge } from "@/components/landing/Doodles";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />

    {/* Flowy brush connector: Hero → WhyNow (cream→sage) */}
    <div className="relative h-16 -mt-4 -mb-4 overflow-visible z-20">
      <DoodleSectionBridge className="w-full h-16 top-0 left-0 opacity-[0.14]" colorFrom="text-primary" colorTo="text-accent" />
    </div>

    <WhyNow />

    {/* Connector: WhyNow → HowItWorks (sage→cream) */}
    <div className="relative h-14 -mt-3 -mb-3 overflow-visible z-20">
      <DoodleSectionBridge className="w-full h-14 top-0 left-0 opacity-[0.12] scale-x-[-1]" colorFrom="text-accent" colorTo="text-primary" />
    </div>

    <HowItWorks />

    {/* Connector: HowItWorks → PayForPerformance (cream→dark) */}
    <div className="relative h-16 -mt-4 -mb-4 overflow-visible z-20">
      <DoodleSectionBridge className="w-full h-16 top-0 left-0 opacity-[0.12]" colorFrom="text-primary" colorTo="text-lantern-cream" />
    </div>

    <PayForPerformance />

    {/* Connector: PayForPerformance → BusinessTypes (dark→cream) */}
    <div className="relative h-14 -mt-3 -mb-3 overflow-visible z-20">
      <DoodleSectionBridge className="w-full h-14 top-0 left-0 opacity-[0.14] scale-x-[-1]" colorFrom="text-accent" colorTo="text-primary" />
    </div>

    <BusinessTypes />

    {/* Connector: BusinessTypes → Team (cream→sage) */}
    <div className="relative h-16 -mt-4 -mb-4 overflow-visible z-20">
      <DoodleSectionBridge className="w-full h-16 top-0 left-0 opacity-[0.12]" colorFrom="text-primary" colorTo="text-accent" />
    </div>

    <Team />

    {/* Connector: Team → WaitlistCTA (sage→cream) */}
    <div className="relative h-14 -mt-3 -mb-3 overflow-visible z-20">
      <DoodleSectionBridge className="w-full h-14 top-0 left-0 opacity-[0.13] scale-x-[-1]" colorFrom="text-accent" colorTo="text-primary" />
    </div>

    <WaitlistCTA />
    <Footer />
  </div>
);

export default Index;
