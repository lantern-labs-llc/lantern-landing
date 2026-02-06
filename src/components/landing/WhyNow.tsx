import { motion } from "framer-motion";
import { MessageSquare, TrendingDown, Eye } from "lucide-react";
import { DoodleStreetLamp, DoodleWindowBox, DoodleHangingSign, DoodleHangingLantern } from "./Doodles";

const stats = [
  { icon: MessageSquare, stat: "40%", label: "of consumers now use AI for local recommendations" },
  { icon: TrendingDown, stat: "–30%", label: "drop in traditional search traffic for local businesses" },
  { icon: Eye, stat: "0%", label: "of Main St. businesses are optimized for AI discovery" },
];

const WhyNow = () => (
  <section className="section-padding bg-lantern-sage-light relative overflow-hidden">
    <DoodleStreetLamp className="w-11 top-6 right-[4%] opacity-[0.17] rotate-[-8deg]" color="text-accent" />
    <DoodleWindowBox className="w-16 bottom-8 left-[3%] opacity-[0.15] rotate-[5deg]" color="text-accent" />
    <DoodleHangingSign className="w-13 top-[30%] left-[1%] opacity-[0.13] rotate-[12deg]" color="text-accent" />
    <DoodleHangingLantern className="w-9 bottom-[25%] right-[8%] opacity-[0.12] rotate-[-14deg]" color="text-accent" />
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          The World Changed.{" "}
          <span className="italic text-gradient-lantern">Have You?</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          People are replacing Google with ChatGPT, Gemini, and Perplexity to find local services.
          If AI doesn't know you exist, neither do your future customers.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-xl p-8 shadow-card-lantern text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <item.icon size={22} className="text-primary" />
            </div>
            <p className="font-display text-4xl mb-2">{item.stat}</p>
            <p className="text-muted-foreground text-sm">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyNow;
