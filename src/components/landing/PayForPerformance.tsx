import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { DoodleHangingLantern, DoodleStreetLamp, DoodleCobblestone } from "./Doodles";

const benefits = [
  "No setup fees or monthly retainers",
  "Pay only when a customer takes action",
  "AI‑optimized landing pages included",
  "Real‑time performance dashboard",
  "Cancel anytime — no contracts",
];

const PayForPerformance = () => (
  <section className="section-padding bg-lantern-deep text-lantern-cream relative overflow-hidden">
    {/* Subtle glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-glow opacity-30 pointer-events-none" />
    <DoodleHangingLantern className="w-12 top-10 right-[5%] opacity-[0.18]" color="text-lantern-cream" />
    <DoodleStreetLamp className="w-10 bottom-10 left-[4%] opacity-[0.15]" color="text-lantern-cream" />
    <DoodleCobblestone className="w-36 bottom-6 right-[10%] opacity-[0.12]" color="text-lantern-cream" />

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
