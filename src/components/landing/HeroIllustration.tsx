import { motion } from "framer-motion";
import { Search, DollarSign, MessageSquare, Pencil, Binoculars, Heart, Star, Users } from "lucide-react";

const orbitIcons = [
  { icon: Binoculars, label: "Searching", bg: "bg-primary/15", text: "text-primary", delay: 0 },
  { icon: DollarSign, label: "Spending", bg: "bg-secondary/15", text: "text-secondary", delay: 0.8 },
  { icon: MessageSquare, label: "Chatting", bg: "bg-accent/15", text: "text-accent", delay: 1.6 },
  { icon: Pencil, label: "Researching", bg: "bg-primary/15", text: "text-primary", delay: 2.4 },
  { icon: Heart, label: "Loving", bg: "bg-secondary/15", text: "text-secondary", delay: 3.2 },
  { icon: Search, label: "Discovering", bg: "bg-accent/15", text: "text-accent", delay: 4.0 },
  { icon: Star, label: "Rating", bg: "bg-primary/15", text: "text-primary", delay: 4.8 },
  { icon: Users, label: "Referring", bg: "bg-secondary/15", text: "text-secondary", delay: 5.6 },
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-[90%] h-[90%] rounded-full border-2 border-dashed border-primary/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner glow ring */}
      <motion.div
        className="absolute w-[65%] h-[65%] rounded-full border border-secondary/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Soft radial glow behind lantern */}
      <div className="absolute w-[50%] h-[50%] rounded-full bg-primary/8 blur-3xl" />

      {/* Central Lantern SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow rays */}
          <motion.g
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="60" y1="55" x2="20" y2="25" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            <line x1="60" y1="55" x2="100" y2="25" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            <line x1="60" y1="55" x2="60" y2="10" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <line x1="60" y1="55" x2="10" y2="50" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
            <line x1="60" y1="55" x2="110" y2="50" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
            <line x1="60" y1="55" x2="30" y2="15" stroke="hsl(21 78% 57%)" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
            <line x1="60" y1="55" x2="90" y2="15" stroke="hsl(21 78% 57%)" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
          </motion.g>

          {/* Lantern top finial */}
          <path d="M57 38L60 28L63 38" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Lantern cap */}
          <path d="M44 42H76L74 38H46L44 42Z" fill="hsl(93 33% 18%)" />

          {/* Lantern body */}
          <path d="M46 42L42 78H78L74 42" stroke="hsl(93 33% 18%)" strokeWidth="2.5" fill="hsl(40 33% 93%)" />

          {/* Lantern glass panels */}
          <line x1="54" y1="42" x2="52" y2="78" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.4" />
          <line x1="66" y1="42" x2="68" y2="78" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.4" />
          <line x1="43" y1="60" x2="77" y2="60" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.4" />

          {/* Inner glow - the flame */}
          <motion.ellipse
            cx="60"
            cy="60"
            rx="10"
            ry="13"
            fill="hsl(45 90% 65%)"
            opacity="0.6"
            animate={{ ry: [13, 15, 13], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="60"
            cy="62"
            rx="6"
            ry="8"
            fill="hsl(40 95% 78%)"
            opacity="0.8"
            animate={{ ry: [8, 9.5, 8], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Lantern bottom */}
          <path d="M42 78H78L76 84H44L42 78Z" fill="hsl(93 33% 18%)" />

          {/* Post connector */}
          <rect x="56" y="84" width="8" height="8" fill="hsl(93 33% 18%)" rx="1" />

          {/* Post */}
          <rect x="57" y="92" width="6" height="80" fill="hsl(93 33% 18%)" rx="2" />

          {/* Post details */}
          <ellipse cx="60" cy="110" rx="10" ry="3" stroke="hsl(93 33% 18%)" strokeWidth="2" fill="none" />
          <ellipse cx="60" cy="145" rx="8" ry="2.5" stroke="hsl(93 33% 18%)" strokeWidth="1.5" fill="none" />

          {/* Base */}
          <path d="M40 172L60 168L80 172L82 178H38L40 172Z" fill="hsl(93 33% 18%)" />
          <path d="M34 178H86L88 184H32L34 178Z" fill="hsl(93 33% 18%)" />

          {/* Ground shadow */}
          <ellipse cx="60" cy="188" rx="30" ry="4" fill="hsl(93 33% 18%)" opacity="0.1" />
        </svg>
      </motion.div>

      {/* Orbiting icon badges */}
      {orbitIcons.map((item, i) => {
        const totalIcons = orbitIcons.length;
        const angle = (i / totalIcons) * 360;
        // Alternating orbit distances for visual interest
        const radius = i % 2 === 0 ? 42 : 36;

        return (
          <motion.div
            key={item.label}
            className="absolute z-20"
            style={{
              top: `${50 - radius * Math.cos((angle * Math.PI) / 180)}%`,
              left: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: "backOut" }}
          >
            <motion.div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${item.bg} backdrop-blur-sm border border-border/50 shadow-card-lantern`}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + (i % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay * 0.3,
              }}
            >
              <item.icon size={20} className={item.text} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Ambient floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/20"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
