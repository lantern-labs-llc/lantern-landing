import { motion } from "framer-motion";

/**
 * Friendly character faces — simple circles with emoji-esque expressions
 * and a small activity icon/accessory. Each has a unique personality.
 */

interface CharacterProps {
  size: number;
  fill: string;
  accent: string;
  expression: "happy" | "curious" | "excited" | "searching" | "thinking" | "wink" | "love" | "star";
  accessory?: "binoculars" | "dollar" | "pencil" | "chat" | "magnifier" | "heart" | "star" | "phone";
}

const eyeVariants = {
  happy: (
    <>
      <circle cx="-4" cy="-2" r="1.8" fill="currentColor" />
      <circle cx="4" cy="-2" r="1.8" fill="currentColor" />
      <path d="M-3 3C-1 5.5 1 5.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </>
  ),
  curious: (
    <>
      <circle cx="-4" cy="-2" r="2" fill="currentColor" />
      <circle cx="5" cy="-3" r="2.5" fill="currentColor" />
      <circle cx="5.5" cy="-3.5" r="0.8" fill="white" />
      <path d="M-2 4C0 5 2 4.5 3 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </>
  ),
  excited: (
    <>
      <circle cx="-4" cy="-2" r="2" fill="currentColor" />
      <circle cx="4" cy="-2" r="2" fill="currentColor" />
      <ellipse cx="0" cy="4" rx="3" ry="2.5" fill="currentColor" opacity="0.9" />
    </>
  ),
  searching: (
    <>
      <circle cx="-3" cy="-2" r="1.5" fill="currentColor" />
      <circle cx="5" cy="-2" r="1.5" fill="currentColor" />
      <path d="M-4 -5C-2 -7 2 -7 4 -5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M-2 3.5C0 4.5 2 4 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </>
  ),
  thinking: (
    <>
      <circle cx="-4" cy="-1" r="1.8" fill="currentColor" />
      <circle cx="4" cy="-3" r="1.8" fill="currentColor" />
      <path d="M-3 4L3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  wink: (
    <>
      <circle cx="-4" cy="-2" r="1.8" fill="currentColor" />
      <path d="M3 -3C4 -1 5 -1 6 -3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M-3 3C-1 5.5 1 5.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </>
  ),
  love: (
    <>
      {/* Heart eyes */}
      <path d="M-6 -3C-6 -5 -4 -6 -3 -4C-2 -6 0 -5 0 -3C0 -1 -3 1 -3 1C-3 1 -6 -1 -6 -3Z" fill="hsl(0 70% 60%)" />
      <path d="M2 -3C2 -5 4 -6 5 -4C6 -6 8 -5 8 -3C8 -1 5 1 5 1C5 1 2 -1 2 -3Z" fill="hsl(0 70% 60%)" />
      <path d="M-3 4C-1 6 1 6 3 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </>
  ),
  star: (
    <>
      <circle cx="-4" cy="-2" r="2.2" fill="currentColor" />
      <circle cx="-4" cy="-2.5" r="0.7" fill="white" />
      <circle cx="4" cy="-2" r="2.2" fill="currentColor" />
      <circle cx="4" cy="-2.5" r="0.7" fill="white" />
      <path d="M-2 4C0 6 2 5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </>
  ),
};

const Character = ({ size, fill, accent, expression }: CharacterProps) => (
  <svg width={size} height={size} viewBox="-20 -20 40 40">
    {/* Body circle */}
    <circle cx="0" cy="0" r="16" fill={fill} />
    <circle cx="0" cy="0" r="16" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.3" />
    {/* Face */}
    <g color={accent}>
      {eyeVariants[expression]}
    </g>
  </svg>
);

const characters = [
  // Top area — scattered
  { x: "78%", y: "4%", size: 52, fill: "hsl(21 78% 88%)", accent: "hsl(21 78% 40%)", expression: "curious" as const, accessory: "binoculars" as const, rotate: -8, floatDelay: 0, floatDuration: 3.5 },
  { x: "18%", y: "2%", size: 40, fill: "hsl(107 18% 82%)", accent: "hsl(93 33% 22%)", expression: "happy" as const, accessory: "chat" as const, rotate: 12, floatDelay: 0.5, floatDuration: 4 },
  { x: "52%", y: "0%", size: 36, fill: "hsl(45 80% 85%)", accent: "hsl(21 50% 35%)", expression: "star" as const, accessory: "star" as const, rotate: -5, floatDelay: 1.2, floatDuration: 3.8 },

  // Right side
  { x: "88%", y: "30%", size: 44, fill: "hsl(107 20% 78%)", accent: "hsl(93 33% 18%)", expression: "excited" as const, accessory: "dollar" as const, rotate: 15, floatDelay: 0.3, floatDuration: 3.2 },
  { x: "92%", y: "60%", size: 38, fill: "hsl(21 78% 84%)", accent: "hsl(21 78% 38%)", expression: "wink" as const, accessory: "phone" as const, rotate: -12, floatDelay: 1, floatDuration: 4.2 },

  // Left side
  { x: "2%", y: "22%", size: 46, fill: "hsl(45 70% 82%)", accent: "hsl(21 50% 32%)", expression: "searching" as const, accessory: "magnifier" as const, rotate: 8, floatDelay: 0.7, floatDuration: 3.6 },
  { x: "-2%", y: "55%", size: 34, fill: "hsl(107 22% 85%)", accent: "hsl(93 33% 20%)", expression: "thinking" as const, accessory: "pencil" as const, rotate: -15, floatDelay: 1.5, floatDuration: 3.9 },

  // Bottom area
  { x: "15%", y: "80%", size: 42, fill: "hsl(21 78% 86%)", accent: "hsl(21 78% 36%)", expression: "love" as const, accessory: "heart" as const, rotate: 10, floatDelay: 0.2, floatDuration: 4.1 },
  { x: "82%", y: "82%", size: 36, fill: "hsl(45 75% 84%)", accent: "hsl(21 55% 34%)", expression: "happy" as const, accessory: "dollar" as const, rotate: -6, floatDelay: 0.9, floatDuration: 3.4 },
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Soft ambient glow */}
      <div className="absolute w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl top-[25%] left-[30%]" />

      {/* Central Lantern — simple, friendly, brand colors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        <svg width="100" height="180" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow rays — warm, soft */}
          <motion.g
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="50" y1="42" x2="15" y2="15" stroke="hsl(21 78% 57%)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <line x1="50" y1="42" x2="85" y2="15" stroke="hsl(21 78% 57%)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <line x1="50" y1="42" x2="50" y2="5" stroke="hsl(21 78% 57%)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            <line x1="50" y1="48" x2="8" y2="38" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
            <line x1="50" y1="48" x2="92" y2="38" stroke="hsl(21 78% 57%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
          </motion.g>

          {/* Lantern top cap */}
          <path d="M42 38H58L60 34H40L42 38Z" fill="hsl(93 33% 18%)" rx="1" />

          {/* Lantern body — rounded, friendly */}
          <rect x="38" y="38" width="24" height="32" rx="5" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 18%)" strokeWidth="2.5" />

          {/* Glass pane lines */}
          <line x1="50" y1="40" x2="50" y2="68" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.25" />
          <line x1="39" y1="54" x2="61" y2="54" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.25" />

          {/* Inner flame glow */}
          <motion.ellipse
            cx="50"
            cy="53"
            rx="7"
            ry="9"
            fill="hsl(45 90% 70%)"
            opacity="0.5"
            animate={{ ry: [9, 11, 9], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="50"
            cy="55"
            rx="4"
            ry="5.5"
            fill="hsl(42 95% 80%)"
            opacity="0.7"
            animate={{ ry: [5.5, 6.5, 5.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Lantern bottom */}
          <path d="M38 70H62L60 74H40L38 70Z" fill="hsl(93 33% 18%)" />

          {/* Post — simple rounded */}
          <rect x="47" y="74" width="6" height="78" rx="3" fill="hsl(93 33% 18%)" />

          {/* Simple base */}
          <ellipse cx="50" cy="152" rx="16" ry="5" fill="hsl(93 33% 18%)" />
          <ellipse cx="50" cy="156" rx="20" ry="4" fill="hsl(93 33% 18%)" opacity="0.6" />

          {/* Ground shadow */}
          <ellipse cx="50" cy="162" rx="25" ry="3" fill="hsl(93 33% 18%)" opacity="0.08" />
        </svg>
      </motion.div>

      {/* Character faces — randomly scattered */}
      {characters.map((char, i) => (
        <motion.div
          key={i}
          className="absolute z-20"
          style={{
            top: char.y,
            left: char.x,
            transform: `translate(-50%, -50%) rotate(${char.rotate}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "backOut" }}
        >
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [char.rotate, char.rotate + 2, char.rotate] }}
            transition={{
              duration: char.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: char.floatDelay,
            }}
          >
            <Character
              size={char.size}
              fill={char.fill}
              accent={char.accent}
              expression={char.expression}
              accessory={char.accessory}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Tiny ambient dots — like fireflies */}
      {[
        { x: "30%", y: "18%", delay: 0 },
        { x: "70%", y: "22%", delay: 0.8 },
        { x: "25%", y: "70%", delay: 1.5 },
        { x: "72%", y: "72%", delay: 0.4 },
        { x: "45%", y: "88%", delay: 1.1 },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary/25"
          style={{ top: dot.y, left: dot.x }}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
