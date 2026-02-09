import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroIllustration from "./HeroIllustration";
const Hero = () => <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-16">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-glow pointer-events-none animate-glow-pulse" />

    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-0">
      <motion.div initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.7
    }} className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-semibold tracking-wide uppercase text-primary">
            Waitlist Now Open
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
          Turn AI chats into{" "}
          <span className="text-gradient-lantern italic">real customers</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
          Your next customer just asked AI for a recommendation. Did you get mentioned? Lantern is your AI partner—putting your business in front of people who are ready to buy, then making sure they become your customers.
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

        <p className="mt-6 text-xs text-muted-foreground">🔥 Currently focused on our hometown of Charlottesville, VA!</p>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.8,
      delay: 0.2
    }} className="relative z-10">
        <HeroIllustration />
      </motion.div>
    </div>
  </section>;
export default Hero;