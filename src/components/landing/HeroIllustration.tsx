import { motion } from "framer-motion";

/**
 * Notion-inspired hero illustration:
 * A large, warm, friendly lantern with hand-drawn character busts gathered around it.
 * Characters have messy hair, dot eyes, simple expressions, and colorful accessory badges.
 */

/* ── Individual character busts (Notion-style line art) ── */

const Person1 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" className={className}>
    {/* Hair - messy short */}
    <path d="M18 32C16 18 24 10 35 8C46 10 54 18 52 32" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" fill="hsl(93 33% 18%)" />
    <path d="M20 16C22 10 28 6 35 6C42 6 48 10 50 16" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" fill="hsl(93 33% 18%)" />
    {/* Messy tufts */}
    <path d="M24 10C22 4 26 2 28 6" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 8C42 2 46 4 44 10" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" />
    {/* Head */}
    <ellipse cx="35" cy="38" rx="17" ry="19" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Eyes - simple dots */}
    <circle cx="29" cy="36" r="2.2" fill="hsl(93 33% 18%)" />
    <circle cx="41" cy="36" r="2.2" fill="hsl(93 33% 18%)" />
    {/* Smile */}
    <path d="M30 44C33 47 37 47 40 44" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Shoulders */}
    <path d="M18 56C18 52 24 50 35 50C46 50 52 52 52 56L54 72H16L18 56Z" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Badge - magnifying glass */}
    <circle cx="56" cy="24" r="11" fill="hsl(21 78% 57%)" />
    <circle cx="54" cy="22" r="5" stroke="white" strokeWidth="2" fill="none" />
    <line x1="58" y1="26" x2="62" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Person2 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" className={className}>
    {/* Hair - long wavy */}
    <path d="M14 40C12 28 18 14 35 10C52 14 58 28 56 40" stroke="hsl(93 33% 18%)" strokeWidth="2.5" fill="hsl(93 33% 18%)" />
    <path d="M14 40C12 50 14 58 16 62" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M56 40C58 50 56 58 54 62" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Head */}
    <ellipse cx="35" cy="38" rx="17" ry="19" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Eyes - curious, one bigger */}
    <circle cx="28" cy="36" r="2" fill="hsl(93 33% 18%)" />
    <circle cx="40" cy="35" r="2.8" fill="hsl(93 33% 18%)" />
    <circle cx="41" cy="34" r="0.9" fill="white" />
    {/* Small o mouth */}
    <ellipse cx="34" cy="46" rx="2.5" ry="2" fill="hsl(93 33% 18%)" opacity="0.8" />
    {/* Shoulders */}
    <path d="M18 58C18 54 24 52 35 52C46 52 52 54 52 58L54 74H16L18 58Z" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Badge - dollar sign */}
    <circle cx="58" cy="20" r="11" fill="hsl(107 18% 52%)" />
    <text x="58" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
  </svg>
);

const Person3 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" className={className}>
    {/* Hair - spiky fun */}
    <path d="M20 30C18 20 24 12 35 10C46 12 52 20 50 30" stroke="hsl(93 33% 18%)" strokeWidth="2.5" fill="hsl(93 33% 18%)" />
    <path d="M22 14L18 4" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M35 10L35 2" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 14L52 4" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 12L26 4" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 12L44 4" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" />
    {/* Head */}
    <ellipse cx="35" cy="38" rx="17" ry="19" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Eyes - excited */}
    <circle cx="28" cy="35" r="2.5" fill="hsl(93 33% 18%)" />
    <circle cx="42" cy="35" r="2.5" fill="hsl(93 33% 18%)" />
    {/* Big grin */}
    <path d="M27 44C30 49 40 49 43 44" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Shoulders */}
    <path d="M18 56C18 52 24 50 35 50C46 50 52 52 52 56L54 72H16L18 56Z" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Badge - chat bubble */}
    <circle cx="12" cy="22" r="11" fill="hsl(21 78% 57%)" />
    <path d="M6 18H18V26H10L8 30L8 26H6V18Z" fill="none" stroke="white" strokeWidth="1.8" rx="2" />
  </svg>
);

const Person4 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" className={className}>
    {/* Hair - bun on top */}
    <path d="M20 34C18 24 24 16 35 14C46 16 52 24 50 34" stroke="hsl(93 33% 18%)" strokeWidth="2.5" fill="hsl(93 33% 18%)" />
    <circle cx="35" cy="8" r="8" fill="hsl(93 33% 18%)" stroke="hsl(93 33% 18%)" strokeWidth="2" />
    {/* Head */}
    <ellipse cx="35" cy="40" rx="17" ry="19" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Eyes - happy closed */}
    <path d="M26 37C28 35 30 35 32 37" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M38 37C40 35 42 35 44 37" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Smile */}
    <path d="M30 46C33 49 37 49 40 46" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Shoulders */}
    <path d="M18 58C18 54 24 52 35 52C46 52 52 54 52 58L54 74H16L18 58Z" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Badge - star */}
    <circle cx="56" cy="26" r="11" fill="hsl(45 85% 55%)" />
    <path d="M56 18L58 23H63L59 26L60 31L56 28L52 31L53 26L49 23H54L56 18Z" fill="white" />
  </svg>
);

const Person5 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" className={className}>
    {/* Hair - curly */}
    <path d="M18 34C16 22 22 14 35 12C48 14 54 22 52 34" stroke="hsl(93 33% 18%)" strokeWidth="2.5" fill="hsl(93 33% 18%)" />
    <circle cx="20" cy="18" r="5" fill="hsl(93 33% 18%)" />
    <circle cx="30" cy="10" r="5" fill="hsl(93 33% 18%)" />
    <circle cx="40" cy="10" r="5" fill="hsl(93 33% 18%)" />
    <circle cx="50" cy="18" r="5" fill="hsl(93 33% 18%)" />
    <circle cx="35" cy="8" r="4" fill="hsl(93 33% 18%)" />
    {/* Head */}
    <ellipse cx="35" cy="38" rx="17" ry="19" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Winking */}
    <circle cx="28" cy="36" r="2.2" fill="hsl(93 33% 18%)" />
    <path d="M39 35C41 33 43 33 45 35" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Smirk */}
    <path d="M30 44C33 47 38 46 40 44" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Shoulders */}
    <path d="M18 56C18 52 24 50 35 50C46 50 52 52 52 56L54 72H16L18 56Z" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Badge - binoculars */}
    <circle cx="14" cy="20" r="11" fill="hsl(107 18% 52%)" />
    <circle cx="10" cy="19" r="4" stroke="white" strokeWidth="1.5" fill="none" />
    <circle cx="18" cy="19" r="4" stroke="white" strokeWidth="1.5" fill="none" />
    <line x1="14" y1="19" x2="14" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Person6 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 70 80" fill="none" className={className}>
    {/* Hair - side part */}
    <path d="M18 32C16 20 24 12 35 10C46 12 54 20 52 32" stroke="hsl(93 33% 18%)" strokeWidth="2.5" fill="hsl(93 33% 18%)" />
    <path d="M22 14C24 10 30 8 36 10" stroke="hsl(93 33% 18%)" strokeWidth="3" strokeLinecap="round" />
    <path d="M52 24C54 20 56 22 54 28" stroke="hsl(93 33% 18%)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Head */}
    <ellipse cx="35" cy="38" rx="17" ry="19" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Eyes - looking up thinking */}
    <circle cx="28" cy="34" r="2" fill="hsl(93 33% 18%)" />
    <circle cx="40" cy="32" r="2" fill="hsl(93 33% 18%)" />
    {/* Thinking mouth */}
    <path d="M32 46L38 45" stroke="hsl(93 33% 18%)" strokeWidth="2" strokeLinecap="round" />
    {/* Shoulders */}
    <path d="M18 56C18 52 24 50 35 50C46 50 52 52 52 56L54 72H16L18 56Z" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />
    {/* Badge - pencil */}
    <circle cx="56" cy="22" r="11" fill="hsl(21 78% 57%)" />
    <line x1="52" y1="28" x2="60" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 16L62 14" stroke="hsl(45 85% 65%)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Friendly Lantern (large, central, warm) ── */
const Lantern = () => (
  <svg viewBox="0 0 140 220" fill="none" className="w-full h-full">
    {/* Warm glow rays */}
    <motion.g
      animate={{ opacity: [0.15, 0.4, 0.15] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 70 + Math.cos(rad) * 55;
        const y2 = 65 + Math.sin(rad) * 55;
        return (
          <line key={angle} x1="70" y1="65" x2={x2} y2={y2}
            stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round"
            opacity={angle % 60 === 0 ? 0.35 : 0.2} />
        );
      })}
    </motion.g>

    {/* Hook/top */}
    <path d="M64 28C64 20 68 16 70 14C72 16 76 20 76 28" stroke="hsl(93 33% 18%)" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Lantern cap */}
    <path d="M52 32H88C90 30 88 28 86 28H54C52 28 50 30 52 32Z" fill="hsl(93 33% 18%)" />

    {/* Lantern body — big rounded rectangle, warm & inviting */}
    <rect x="50" y="32" width="40" height="50" rx="8" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="3" />

    {/* Glass panes */}
    <line x1="70" y1="34" x2="70" y2="80" stroke="hsl(93 33% 18%)" strokeWidth="1.2" opacity="0.2" />
    <line x1="52" y1="57" x2="88" y2="57" stroke="hsl(93 33% 18%)" strokeWidth="1.2" opacity="0.2" />

    {/* Flame glow */}
    <motion.ellipse cx="70" cy="58" rx="12" ry="16"
      fill="hsl(45 90% 70%)" opacity="0.4"
      animate={{ ry: [16, 18, 16], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.ellipse cx="70" cy="60" rx="7" ry="10"
      fill="hsl(42 95% 80%)" opacity="0.7"
      animate={{ ry: [10, 12, 10] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    />
    <motion.ellipse cx="70" cy="62" rx="3" ry="5"
      fill="hsl(40 100% 90%)" opacity="0.9"
      animate={{ ry: [5, 6, 5] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />

    {/* Lantern bottom cap */}
    <path d="M50 82H90L88 88H52L50 82Z" fill="hsl(93 33% 18%)" />

    {/* Post */}
    <rect x="66" y="88" width="8" height="100" rx="4" fill="hsl(93 33% 18%)" />

    {/* Post ring details */}
    <rect x="62" y="96" width="16" height="4" rx="2" fill="hsl(93 33% 18%)" />
    <rect x="63" y="130" width="14" height="3" rx="1.5" fill="hsl(93 33% 18%)" />

    {/* Base - friendly rounded */}
    <ellipse cx="70" cy="188" rx="24" ry="8" fill="hsl(93 33% 18%)" />
    <ellipse cx="70" cy="192" rx="30" ry="6" fill="hsl(93 33% 18%)" opacity="0.5" />

    {/* Ground shadow */}
    <ellipse cx="70" cy="200" rx="40" ry="5" fill="hsl(93 33% 18%)" opacity="0.08" />
  </svg>
);

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: "1.1" }}>
      {/* Soft glow behind lantern */}
      <div className="absolute top-[10%] left-[28%] w-[44%] h-[44%] rounded-full bg-primary/8 blur-3xl" />

      {/* Central Lantern — big and prominent */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[5%] w-[38%] z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Lantern />
      </motion.div>

      {/* Characters — Notion-style busts clustered around the lantern */}
      {/* Bottom row — three people overlapping */}
      <motion.div
        className="absolute bottom-[2%] left-[5%] w-[28%] z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
          <Person3 className="w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[0%] left-[28%] w-[26%] z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
      >
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <Person1 className="w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[4%] right-[8%] w-[26%] z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Person2 className="w-full" />
        </motion.div>
      </motion.div>

      {/* Side characters — peeking from behind */}
      <motion.div
        className="absolute top-[35%] left-[-2%] w-[24%] z-5"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.05 }}
      >
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
          <Person5 className="w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-[32%] right-[-2%] w-[24%] z-5"
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
          <Person4 className="w-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] right-[2%] w-[22%] z-15"
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.35 }}
      >
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
          <Person6 className="w-full" />
        </motion.div>
      </motion.div>

      {/* Tiny warm dots — firefly accents */}
      {[
        { x: "20%", y: "20%", d: 0 },
        { x: "75%", y: "18%", d: 0.8 },
        { x: "12%", y: "60%", d: 1.5 },
        { x: "85%", y: "55%", d: 0.4 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{ top: dot.y, left: dot.x }}
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: dot.d }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
