import { motion } from "framer-motion";
import { DoodleHangingLantern, DoodleCafeShop, DoodleStreetLamp } from "./Doodles";

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Co‑Founder",
    bio: "Former Google Search lead. Passionate about leveling the playing field for local businesses.",
    initials: "AC",
  },
  {
    name: "Maria Santos",
    role: "CTO & Co‑Founder",
    bio: "AI researcher turned entrepreneur. Built recommendation systems at scale.",
    initials: "MS",
  },
  {
    name: "James Okafor",
    role: "Head of Partnerships",
    bio: "10 years helping SMBs grow. Knows Main Street inside and out.",
    initials: "JO",
  },
];

const Team = () => (
  <section id="team" className="section-padding bg-lantern-sage-light relative overflow-hidden">
    <DoodleHangingLantern className="w-10 top-10 right-[5%] opacity-[0.16]" color="text-accent" />
    <DoodleCafeShop className="w-18 bottom-10 left-[3%] opacity-[0.13]" color="text-accent" />
    <DoodleStreetLamp className="w-8 top-[45%] left-[4%] opacity-[0.14]" color="text-accent" />
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          Meet the <span className="italic text-gradient-lantern">Team</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          We're builders who believe local businesses are the heartbeat of every community.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-lantern">
              <span className="font-display text-2xl text-primary">{member.initials}</span>
            </div>
            <h3 className="font-display text-lg">{member.name}</h3>
            <p className="text-sm font-semibold text-primary mb-2">{member.role}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
