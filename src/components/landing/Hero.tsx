import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";
import { DoodleLanternPost, DoodleHangingLantern, DoodleStorefront, DoodleCobblestone, DoodleWindowBox } from "./Doodles";

const Hero = () => (
  <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-16">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-glow pointer-events-none animate-glow-pulse" />

    {/* Doodle accents – varied angles */}
    <DoodleLanternPost className="w-16 top-[8%] left-[2%] opacity-[0.18] rotate-[6deg]" />
    <DoodleHangingLantern className="w-11 top-[6%] right-[6%] opacity-[0.16] -rotate-[10deg]" />
    <DoodleStorefront className="w-28 bottom-[10%] left-[3%] opacity-[0.13] rotate-[4deg]" />
    <DoodleCobblestone className="w-44 bottom-[5%] right-[6%] opacity-[0.15] rotate-[-3deg]" />
    <DoodleWindowBox className="w-12 top-[50%] right-[3%] opacity-[0.11] rotate-[12deg]" />
    <DoodleHangingLantern className="w-9 bottom-[30%] left-[8%] opacity-[0.10] rotate-[-15deg]" />

    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-semibold tracking-wide uppercase text-primary">
            Waitlist Now Open
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
          Help AI Chatbots{" "}
          <span className="text-gradient-lantern italic">Discover</span>{" "}
          Your Business
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
          Millions of people now ask chatbots for local recommendations. Lantern makes sure they hear about{" "}
          <em>you</em> — and then converts that traffic with AI‑optimized landing pages. Pay only for results.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="shadow-lantern">
            <a href="#waitlist">
              Join the Waitlist
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          🔥 Over 500 businesses already on the waitlist
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        <div className="rounded-2xl overflow-hidden shadow-glow-lantern border border-border/50">
          <img
            src={heroImage}
            alt="Charming Main Street businesses glowing warmly at golden hour"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
