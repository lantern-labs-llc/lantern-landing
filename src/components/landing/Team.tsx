import { motion } from "framer-motion";

const team = [
  { name: "Matt King", role: "Co‑Founder", bio: "Passionate about supporting local businesses and community. Lover of Skink.", initials: "MK" },
  { name: "Jay Ashton", role: "Co‑Founder", bio: "AI researcher turned entrepreneur. Built recommendation systems at scale.", initials: "JA" },
  { name: "James Okafor", role: "Head of Partnerships", bio: "10 years helping SMBs grow. Knows Main Street inside and out.", initials: "JO" },
] as const;

const Team = () => (
  <section id="team" className="section-padding bg-lantern-sage-light relative overflow-hidden">
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
