import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
const WaitlistCTA = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    navigate(`/waitlist?email=${encodeURIComponent(email)}`);
  };
  return <section id="waitlist" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-glow pointer-events-none" />

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-semibold tracking-wide uppercase text-accent">
            Limited Spots Available
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          Ready to Be <span className="italic text-gradient-lantern">Found?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">Join our waitlist. Early members get priority access.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="you@yourbusiness.com" value={email} onChange={e => setEmail(e.target.value)} required className="flex-1 h-12 bg-card" />
            <Button type="submit" size="lg" className="shadow-lantern h-12">
              Join Waitlist
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>

        <p className="mt-4 text-xs text-muted-foreground">
          No spam. No commitments. Just early access.
        </p>
      </motion.div>
    </section>;
};
export default WaitlistCTA;