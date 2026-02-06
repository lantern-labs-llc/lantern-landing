import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhyNow from "@/components/landing/WhyNow";
import HowItWorks from "@/components/landing/HowItWorks";
import PayForPerformance from "@/components/landing/PayForPerformance";
import BusinessTypes from "@/components/landing/BusinessTypes";
import Team from "@/components/landing/Team";
import WaitlistCTA from "@/components/landing/WaitlistCTA";
import Footer from "@/components/landing/Footer";
import { DoodleConnectorWave, DoodleFlowLine } from "@/components/landing/Doodles";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />

    {/* Connector between Hero → WhyNow */}
    <div className="relative h-6 overflow-hidden">
      <DoodleConnectorWave className="w-full top-0 left-0 h-6 opacity-[0.10]" color="text-primary" />
    </div>

    <WhyNow />

    {/* Connector between WhyNow → HowItWorks */}
    <div className="relative h-6 overflow-hidden">
      <DoodleFlowLine className="w-64 top-1 left-[15%] opacity-[0.10]" color="text-primary" />
    </div>

    <HowItWorks />

    {/* Connector between HowItWorks → PayForPerformance */}
    <div className="relative h-6 overflow-hidden">
      <DoodleConnectorWave className="w-full top-0 left-0 h-6 opacity-[0.08]" color="text-primary" />
    </div>

    <PayForPerformance />

    {/* Connector between PayForPerformance → BusinessTypes */}
    <div className="relative h-6 overflow-hidden">
      <DoodleFlowLine className="w-56 top-1 right-[10%] left-auto opacity-[0.10]" color="text-primary" />
    </div>

    <BusinessTypes />

    {/* Connector between BusinessTypes → Team */}
    <div className="relative h-6 overflow-hidden">
      <DoodleConnectorWave className="w-full top-0 left-0 h-6 opacity-[0.08]" color="text-accent" />
    </div>

    <Team />

    {/* Connector between Team → WaitlistCTA */}
    <div className="relative h-6 overflow-hidden">
      <DoodleFlowLine className="w-48 top-1 left-[25%] opacity-[0.10]" color="text-primary" />
    </div>

    <WaitlistCTA />
    <Footer />
  </div>
);

export default Index;