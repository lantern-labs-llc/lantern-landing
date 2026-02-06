import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { DoodleHangingLantern, DoodleStreetLamp, DoodleCobblestone, DoodleStorefront } from "./Doodles";

const benefits = [
  "No setup fees or monthly retainers",
  "Pay only when a customer takes action",
  "AI‑optimized landing pages included",
  "Real‑time performance dashboard",
  "Cancel anytime — no contracts",
];

const PayForPerformance = () => (
  <section className="section-padding bg-lantern-deep text-lantern-cream relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-glow opacity-30 pointer-events-none" />
    <DoodleHangingLantern className="w-14 top-8 right-[4%] opacity-[0.20] rotate-[8deg]" color="text-lantern-cream" />
    <DoodleStreetLamp className="w-12 bottom-6 left-[3%] opacity-[0.16] rotate-[-6deg]" color="text-lantern-cream" />
    <DoodleCobblestone className="w-40 bottom-4 right-[8%] opacity-[0.13] rotate-[3deg]" color="text-lantern-cream" />
    <DoodleStorefront className="w-20 top-[35%] left-[2%] opacity-[0.10] rotate-[-10deg]" color="text-lantern-cream" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl mb-4 text-lantern-cream">
            A No‑Brainer:{" "}
            <span className="text-primary italic">Pay for Performance</span>
          </h2>
          <p className="text-lantern-cream/70 text-lg mb-8 leading-relaxed">
            We believe in earning your trust the same way you earn your customers' — by delivering
            real value first. You only pay when Lantern drives measurable results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-lantern-sage mt-0.5 shrink-0" />
                <span className="text-lantern-cream/90">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PayForPerformance;
