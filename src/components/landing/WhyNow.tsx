import { motion } from "framer-motion";
import { MessageSquare, TrendingDown, Eye } from "lucide-react";
const stats = [{
  icon: MessageSquare,
  stat: "53%",
  label: "of consumers now use AI for local recommendations"
}, {
  icon: TrendingDown,
  stat: "–30%",
  label: "drop in traditional search traffic for local businesses"
}, {
  icon: Eye,
  stat: "0%",
  label: "of Main St. businesses are optimized for AI discovery"
}];
const WhyNow = () => <section className="section-padding bg-lantern-sage-light relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          The World Changed.{" "}
          <span className="italic text-gradient-lantern">Have You?</span>
        </h2>
        <p className="text-muted-foreground text-lg">People are replacing Google with ChatGPT, Gemini, and Claude to find local businesses-like yours. If AI doesn't know you exist, neither do your future customers.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((item, i) => <motion.div key={i} initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: i * 0.15
      }} className="bg-card rounded-xl p-8 shadow-card-lantern text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <item.icon size={22} className="text-primary" />
            </div>
            <p className="font-display text-4xl mb-2">{item.stat}</p>
            <p className="text-muted-foreground text-sm">{item.label}</p>
          </motion.div>)}
      </div>
    </div>
  </section>;
export default WhyNow;