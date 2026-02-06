import { motion } from "framer-motion";

/**
 * Beacon / Magnet metaphor illustration (v1 layout):
 * Central glowing lantern with stylized human silhouettes scattered around,
 * drawn toward it along curved dashed attractor lines.
 * Lantern post design from the latest iteration.
 */

const Person = ({
  color,
  size,
  flip,
}: {
  color: string;
  size: number;
  flip?: boolean;
}) => (
  <svg
    viewBox="0 0 40 58"
    fill="none"
    width={size}
    height={size * 1.45}
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
  >
    <circle cx="20" cy="11" r="9.5" fill={color} />
    <path
      d="M9 27C9 21 14 17 20 17C26 17 31 21 31 27L33 50C33 54 27 56 20 56C13 56 7 54 7 50L9 27Z"
      fill={color}
    />
    <path d="M31 30C34 28 37 26 38 23" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
  </svg>
);

interface FlowingPerson {
  x: number; y: number; size: number; color: string; delay: number;
  flip?: boolean; dx: number; dy: number;
}

const people: FlowingPerson[] = [
  { x: 2, y: 8, size: 28, color: "hsl(21 78% 57%)", delay: 0.3, dx: 6, dy: 8 },
  { x: 10, y: 22, size: 34, color: "hsl(107 18% 52%)", delay: 0.5, dx: 5, dy: 5 },
  { x: 0, y: 48, size: 30, color: "hsl(93 33% 18%)", delay: 0.7, dx: 8, dy: 3 },
  { x: 12, y: 72, size: 32, color: "hsl(21 78% 57%)", delay: 0.4, flip: true, dx: 5, dy: -4 },
  { x: 28, y: 82, size: 26, color: "hsl(107 18% 52%)", delay: 0.9, dx: 3, dy: -6 },
  { x: 72, y: 6, size: 30, color: "hsl(107 18% 52%)", delay: 0.6, flip: true, dx: -5, dy: 7 },
  { x: 82, y: 20, size: 26, color: "hsl(93 33% 18%)", delay: 0.8, flip: true, dx: -7, dy: 5 },
  { x: 85, y: 50, size: 32, color: "hsl(21 78% 57%)", delay: 0.45, flip: true, dx: -8, dy: 2 },
  { x: 75, y: 75, size: 28, color: "hsl(93 33% 18%)", delay: 0.65, flip: true, dx: -5, dy: -5 },
  { x: 60, y: 85, size: 24, color: "hsl(107 18% 52%)", delay: 1.0, flip: true, dx: -2, dy: -7 },
];

const LANTERN_CX = 200;
const LANTERN_CY = 200;

const attractorPath = (px: number, py: number) => {
  const sx = (px / 100) * 400 + 15;
  const sy = (py / 100) * 400 + 10;
  const cpx = (sx + LANTERN_CX) / 2 + (sx < LANTERN_CX ? -40 : 40);
  const cpy = (sy + LANTERN_CY) / 2;
  return `M${sx} ${sy} Q${cpx} ${cpy} ${LANTERN_CX} ${LANTERN_CY}`;
};

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "1" }}>
      {/* Attractor lines */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {people.map((p, i) => (
          <motion.path
            key={i}
            d={attractorPath(p.x, p.y)}
            stroke="hsl(21 78% 57%)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(45 90% 70% / 0.18) 0%, hsl(21 78% 57% / 0.06) 50%, transparent 80%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central Lantern (latest version design) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ width: "28%" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <svg viewBox="0 0 120 260" fill="none" className="w-full h-full">
          {/* Rays */}
          <motion.g animate={{ opacity: [0.12, 0.4, 0.12] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return <line key={angle} x1="60" y1="60" x2={60 + Math.cos(rad) * 48} y2={60 + Math.sin(rad) * 48}
                stroke="hsl(45 85% 72%)" strokeWidth="1.5" strokeLinecap="round" />;
            })}
          </motion.g>

          {/* Hook */}
          <path d="M54 26C50 18 52 10 60 8C68 10 70 18 66 26" stroke="hsl(93 33% 25%)" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Cap */}
          <path d="M42 28H78C80 28 80 32 78 34H42C40 34 40 28 42 28Z" fill="hsl(93 33% 25%)" />

          {/* Body */}
          <rect x="40" y="34" width="40" height="52" rx="12" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 25%)" strokeWidth="2.5" />

          {/* Panes */}
          <line x1="60" y1="36" x2="60" y2="84" stroke="hsl(93 33% 25%)" strokeWidth="0.8" opacity="0.12" />
          <line x1="42" y1="60" x2="78" y2="60" stroke="hsl(93 33% 25%)" strokeWidth="0.8" opacity="0.12" />

          {/* Flame */}
          <motion.ellipse cx="60" cy="58" rx="12" ry="16" fill="hsl(45 90% 70%)" opacity="0.3"
            animate={{ ry: [16, 19, 16], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.ellipse cx="60" cy="59" rx="7" ry="10" fill="hsl(42 95% 80%)" opacity="0.55"
            animate={{ ry: [10, 12, 10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
          <motion.path d="M60 48C57 54 57 62 60 68C63 62 63 54 60 48Z" fill="hsl(40 100% 92%)" opacity="0.85"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />

          {/* Bottom cap */}
          <path d="M42 86H78C80 86 80 92 78 92H42C40 92 40 86 42 86Z" fill="hsl(93 33% 25%)" />

          {/* Post */}
          <path d="M52 92L50 210C50 214 54 216 60 216C66 216 70 214 70 210L68 92" fill="hsl(93 33% 25%)" />
          <rect x="47" y="102" width="26" height="5" rx="2.5" fill="hsl(93 33% 25%)" />
          <rect x="48" y="150" width="24" height="4" rx="2" fill="hsl(93 33% 25%)" />

          {/* Vine */}
          <path d="M68 120C72 116 75 119 73 124C71 129 74 132 72 136"
            stroke="hsl(107 18% 52%)" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.45" />
          <circle cx="75" cy="118" r="2" fill="hsl(107 18% 52%)" opacity="0.35" />
          <circle cx="73" cy="130" r="1.6" fill="hsl(107 18% 52%)" opacity="0.3" />

          {/* Base */}
          <ellipse cx="60" cy="218" rx="30" ry="8" fill="hsl(93 33% 25%)" />
          <ellipse cx="60" cy="222" rx="36" ry="6" fill="hsl(93 33% 25%)" opacity="0.2" />
        </svg>
      </motion.div>

      {/* People */}
      {people.map((p, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, x: -p.dx * 3, y: -p.dy * 3 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: p.delay, ease: "easeOut" }}
        >
          <motion.div
            animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Person color={p.color} size={p.size} flip={p.flip} />
          </motion.div>
        </motion.div>
      ))}

      {/* Sparkles */}
      {[
        { x: "42%", y: "38%", d: 0 },
        { x: "56%", y: "42%", d: 0.6 },
        { x: "38%", y: "55%", d: 1.2 },
        { x: "58%", y: "52%", d: 0.9 },
        { x: "48%", y: "35%", d: 1.5 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
          style={{ top: s.y, left: s.x }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: s.d }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
