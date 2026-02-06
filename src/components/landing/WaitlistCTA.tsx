import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DoodleLanternPost, DoodleStorefront, DoodleHangingLantern, DoodleTownRow, DoodleStreetLamp } from "./Doodles";

const WaitlistCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast({
      title: "You're on the list! 🎉",
      description: "We'll reach out soon with early access details.",
    });
  };

  return (
    <section id="waitlist" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <DoodleLanternPost className="w-16 top-4 left-[2%] opacity-[0.17] rotate-[5deg]" />
      <DoodleHangingLantern className="w-10 top-8 right-[4%] opacity-[0.16] rotate-[-12deg]" />
      <DoodleStorefront className="w-22 bottom-6 right-[3%] opacity-[0.13] rotate-[7deg]" />
      <DoodleTownRow className="w-60 bottom-2 left-[6%] opacity-[0.11] rotate-[-2deg]" />
      <DoodleStreetLamp className="w-9 bottom-[35%] left-[5%] opacity-[0.10] rotate-[15deg]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-semibold tracking-wide uppercase text-accent">
            Limited Spots Available
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          Ready to Be <span className="italic text-gradient-lantern">Found?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Join 500+ local businesses already on the waitlist. Early members get priority access, 
          hands‑on onboarding, and founding member pricing.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 bg-secondary/10 rounded-xl px-6 py-4"
          >
            <CheckCircle2 className="text-secondary" size={22} />
            <span className="font-medium">You're on the list! We'll be in touch soon.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="you@yourbusiness.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 bg-card"
            />
            <Button type="submit" size="lg" className="shadow-lantern h-12">
              Join Waitlist
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          No spam. No commitments. Just early access.
        </p>
      </motion.div>
    </section>
  );
};

export default WaitlistCTA;
