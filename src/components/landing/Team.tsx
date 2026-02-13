"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Jay Ashton",
    role: "Co-Founder",
    image: "/images/jay.png",
    linkedin: "https://www.linkedin.com/in/ashtonjay/",
    bio: "Jay is a serial entrepreneur and software engineer who co-founded Revinate, a hospitality technology company serving thousands of hotels worldwide and backed by top tier venture firms. He\u2019s built and sold multiple startups spanning travel, health tech, and consumer apps\u00a0\u2014 including Five Star Alliance and Strive. Jay started his career writing code in San Francisco and Tokyo, and holds a BA from Williams College and an MBA from UVA\u2019s Darden School.",
  },
  {
    name: "Matt King",
    role: "Co-Founder",
    image: "/images/matt.png",
    linkedin: "https://www.linkedin.com/in/matt-king-b53707337/",
    bio: "Matt is a consummate builder. He founded Walk2Campus Holdings, a student housing company he grew over 20 years to 4,000+ bedrooms across 8 university markets in 5 states. He\u2019s also raised substantial real estate funds to invest in commercial real estate in growing markets. He holds a BA from Washington and Lee University and an MBA from Vanderbilt.",
  },
] as const;

const Team = () => (
  <section id="team" className="section-padding bg-lantern-sage-light relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="font-display text-3xl sm:text-4xl mb-4">
          Why We Started <span className="italic text-gradient-lantern">Lantern</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We&apos;re on a mission to serve Main Street. We&apos;ve spent our careers building technology
          companies and investing in communities. When we saw how fast AI was changing the way people
          find local businesses, we spotted an important need to make sure local businesses don&apos;t get left
          behind. Lantern exists to make sure the businesses that make our communities great are the
          ones AI recommends.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-background/60 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-14 h-14 rounded-full object-cover shrink-0 shadow-lantern"
              />
              <div>
                <h3 className="font-display text-lg">{member.name}</h3>
                <p className="text-sm font-semibold text-primary">{member.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
