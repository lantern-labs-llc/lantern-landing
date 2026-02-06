import { motion } from "framer-motion";
import { Search, Zap, DollarSign } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "We Learn Your Business", description: "We dive deep into what makes your business special — your story, your strengths, your community reputation — and craft the perfect AI profile." },
  { icon: Zap, step: "02", title: "AI Chatbots Recommend You", description: "When someone asks ChatGPT, Gemini, or any AI assistant for a recommendation in your area, your business comes up — naturally and authentically." },
  { icon: DollarSign, step: "03", title: "You Only Pay for Results", description: "Every visitor lands on a custom AI‑optimized page designed to convert. You pay only when it works. No retainers, no guesswork." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          How <span className="italic">Lantern</span> Works
        </h2>
        <p className="text-muted-foreground text-lg">
          Three simple steps. No tech headaches. Just more customers finding you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20" />
            )}
            <div className="bg-card rounded-xl p-8 shadow-card-lantern relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <step.icon size={18} className="text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Step {step.step}
                </span>
              </div>
              <h3 className="font-display text-xl mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
