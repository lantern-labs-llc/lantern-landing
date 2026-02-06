import { motion } from "framer-motion";

/**
 * Beacon illustration — friendly village edition.
 * A warm glowing lantern on a cobblestone main-street path that winds
 * into the distance. Stylised people are drawn toward the light.
 * Soft flowers, leaves, and greenery add personality.
 */

/* ── Stylised person silhouette (rounded, friendly) ── */
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
    {/* Tiny arm wave */}
    <path
      d="M31 30C34 28 37 26 38 23"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ── Tiny flower ── */
const Flower = ({ x, y, color, size = 14 }: { x: string; y: string; color: string; size?: number }) => (
  <motion.svg
    viewBox="0 0 20 20"
    fill="none"
    width={size}
    height={size}
    className="absolute"
    style={{ left: x, top: y }}
    animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.08, 1] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    {[0, 72, 144, 216, 288].map((a) => {
      const rad = (a * Math.PI) / 180;
      const cx = 10 + Math.cos(rad) * 4.5;
      const cy = 10 + Math.sin(rad) * 4.5;
      return <circle key={a} cx={cx} cy={cy} r="3.2" fill={color} opacity="0.8" />;
    })}
    <circle cx="10" cy="10" r="2.5" fill="hsl(45 90% 70%)" />
  </motion.svg>
);

/* ── Leaf ── */
const Leaf = ({ x, y, rotate = 0, size = 18, color = "hsl(107 18% 52%)" }: { x: string; y: string; rotate?: number; size?: number; color?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
    className="absolute"
    style={{ left: x, top: y, rotate: `${rotate}deg` }}
    animate={{ rotate: [rotate, rotate + 6, rotate - 4, rotate] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M4 20C4 12 8 4 12 2C16 4 20 12 20 20" stroke={color} strokeWidth="1.5" fill={color} opacity="0.5" />
    <path d="M12 2V20" stroke={color} strokeWidth="1" opacity="0.6" />
  </motion.svg>
);

/* ── People configuration ── */
interface FlowingPerson {
  x: number; y: number; size: number; color: string; delay: number;
  flip?: boolean; dx: number; dy: number;
}

const people: FlowingPerson[] = [
  // Along the road — approaching from the distance
  { x: 25, y: 10, size: 18, color: "hsl(21 78% 67%)", delay: 0.8, dx: 3, dy: 5 },
  { x: 60, y: 8, size: 16, color: "hsl(107 18% 52%)", delay: 1.0, flip: true, dx: -3, dy: 5 },
  { x: 15, y: 25, size: 22, color: "hsl(107 22% 42%)", delay: 0.6, dx: 5, dy: 5 },
  { x: 72, y: 22, size: 20, color: "hsl(21 78% 57%)", delay: 0.7, flip: true, dx: -5, dy: 5 },
  // Mid-distance
  { x: 4, y: 45, size: 26, color: "hsl(93 33% 18%)", delay: 0.4, dx: 6, dy: 3 },
  { x: 80, y: 42, size: 24, color: "hsl(21 78% 57%)", delay: 0.5, flip: true, dx: -6, dy: 3 },
  // Close to lantern
  { x: 15, y: 62, size: 30, color: "hsl(107 18% 52%)", delay: 0.3, dx: 4, dy: -2 },
  { x: 68, y: 65, size: 32, color: "hsl(21 78% 62%)", delay: 0.35, flip: true, dx: -5, dy: -2 },
  // Foreground
  { x: 8, y: 78, size: 34, color: "hsl(93 33% 18%)", delay: 0.5, dx: 4, dy: -4 },
  { x: 72, y: 80, size: 30, color: "hsl(107 22% 42%)", delay: 0.55, flip: true, dx: -4, dy: -4 },
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "1" }}>
      {/* ── Background: winding main-street path ── */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Distant horizon glow */}
        <ellipse cx="200" cy="60" rx="120" ry="30" fill="hsl(45 90% 70%)" opacity="0.08" />

        {/* Winding road — recedes into distance */}
        <path
          d="M160 40 C170 80, 150 120, 170 160 C190 200, 160 240, 180 280 C200 320, 170 350, 200 380"
          stroke="hsl(40 25% 82%)"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M240 40 C230 80, 250 120, 230 160 C210 200, 240 240, 220 280 C200 320, 230 350, 200 380"
          stroke="hsl(40 25% 82%)"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* Road fill */}
        <path
          d="M160 40 C170 80, 150 120, 170 160 C190 200, 160 240, 180 280 C200 320, 170 350, 200 380
             L200 380 C230 350, 200 320, 220 280 C240 240, 210 200, 230 160 C250 120, 230 80, 240 40 Z"
          fill="hsl(40 25% 85%)"
          opacity="0.45"
        />

        {/* Cobblestone dashes on road */}
        {[80, 120, 160, 200, 240, 280, 320, 355].map((y, i) => (
          <ellipse
            key={i}
            cx={200 + (i % 2 === 0 ? -8 : 8)}
            cy={y}
            rx={10 + (y / 400) * 8}
            ry="2"
            fill="hsl(40 20% 75%)"
            opacity="0.35"
          />
        ))}

        {/* Curved attraction paths (subtle dashed lines) */}
        {[
          "M90 180 Q130 220 200 290",
          "M310 180 Q270 220 200 290",
          "M120 100 Q150 150 200 260",
          "M280 100 Q250 150 200 260",
          "M60 300 Q120 310 200 310",
          "M340 300 Q280 310 200 310",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="hsl(21 78% 57%)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
          />
        ))}

        {/* Grass tufts along the road */}
        {[
          { x: 130, y: 180 }, { x: 260, y: 150 }, { x: 140, y: 260 },
          { x: 255, y: 240 }, { x: 125, y: 320 }, { x: 270, y: 310 },
          { x: 145, y: 100 }, { x: 250, y: 90 },
        ].map((g, i) => (
          <g key={i} opacity="0.35">
            <path d={`M${g.x} ${g.y}C${g.x - 3} ${g.y - 10} ${g.x - 1} ${g.y - 14} ${g.x + 2} ${g.y - 8}`} stroke="hsl(107 18% 52%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d={`M${g.x + 4} ${g.y}C${g.x + 2} ${g.y - 8} ${g.x + 5} ${g.y - 12} ${g.x + 8} ${g.y - 6}`} stroke="hsl(107 18% 52%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </svg>

      {/* ── Ambient lantern glow ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "50%",
          height: "30%",
          bottom: "18%",
          background:
            "radial-gradient(ellipse, hsl(45 90% 70% / 0.18) 0%, hsl(21 78% 57% / 0.08) 50%, transparent 80%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Central Lantern (softer, friendlier) ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ width: "26%", bottom: "12%" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <svg viewBox="0 0 100 190" fill="none" className="w-full h-full">
          {/* Light rays */}
          <motion.g
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1="50" y1="55"
                  x2={50 + Math.cos(rad) * 38}
                  y2={55 + Math.sin(rad) * 38}
                  stroke="hsl(45 85% 72%)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.g>

          {/* Hook — soft curve */}
          <path d="M44 22C44 14 47 10 50 8C53 10 56 14 56 22" stroke="hsl(93 33% 28%)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Cap — rounded */}
          <rect x="35" y="24" width="30" height="5" rx="2.5" fill="hsl(93 33% 28%)" />

          {/* Body — warm cream, very rounded */}
          <rect x="33" y="29" width="34" height="46" rx="10" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 28%)" strokeWidth="2.5" />

          {/* Subtle pane lines */}
          <line x1="50" y1="31" x2="50" y2="73" stroke="hsl(93 33% 28%)" strokeWidth="0.8" opacity="0.12" />
          <line x1="35" y1="52" x2="65" y2="52" stroke="hsl(93 33% 28%)" strokeWidth="0.8" opacity="0.12" />

          {/* Flame */}
          <motion.ellipse cx="50" cy="52" rx="10" ry="14" fill="hsl(45 90% 70%)" opacity="0.3"
            animate={{ ry: [14, 16, 14], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse cx="50" cy="53" rx="6" ry="9" fill="hsl(42 95% 80%)" opacity="0.55"
            animate={{ ry: [9, 11, 9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path d="M50 44C48 48 48 56 50 60C52 56 52 48 50 44Z" fill="hsl(40 100% 92%)" opacity="0.85"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Bottom cap */}
          <rect x="35" y="75" width="30" height="5" rx="2.5" fill="hsl(93 33% 28%)" />

          {/* Post — softer, slightly tapered, rounded */}
          <path d="M44 80L44 150C44 154 46 156 50 156C54 156 56 154 56 150L56 80" fill="hsl(93 33% 28%)" />

          {/* Post rings */}
          <rect x="41" y="88" width="18" height="4" rx="2" fill="hsl(93 33% 28%)" />
          <rect x="42" y="120" width="16" height="3" rx="1.5" fill="hsl(93 33% 28%)" />

          {/* Base — wide and grounded */}
          <ellipse cx="50" cy="158" rx="22" ry="7" fill="hsl(93 33% 28%)" />
          <ellipse cx="50" cy="162" rx="28" ry="5" fill="hsl(93 33% 28%)" opacity="0.25" />

          {/* Tiny vine on post */}
          <path d="M56 100C60 96 62 100 60 104C58 108 62 110 60 114" stroke="hsl(107 18% 52%)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
          <circle cx="62" cy="100" r="1.8" fill="hsl(107 18% 52%)" opacity="0.4" />
          <circle cx="60" cy="110" r="1.5" fill="hsl(107 18% 52%)" opacity="0.35" />
        </svg>
      </motion.div>

      {/* ── Flowing people ── */}
      {people.map((p, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, x: -p.dx * 4, y: -p.dy * 4 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        >
          <motion.div
            animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0] }}
            transition={{ duration: 4.5 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Person color={p.color} size={p.size} flip={p.flip} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Flowers ── */}
      <Flower x="6%" y="55%" color="hsl(21 78% 67%)" size={16} />
      <Flower x="88%" y="50%" color="hsl(21 78% 62%)" size={14} />
      <Flower x="18%" y="85%" color="hsl(45 85% 65%)" size={12} />
      <Flower x="78%" y="88%" color="hsl(21 78% 57%)" size={15} />
      <Flower x="30%" y="6%" color="hsl(107 18% 62%)" size={10} />
      <Flower x="68%" y="4%" color="hsl(45 85% 65%)" size={11} />

      {/* ── Leaves ── */}
      <Leaf x="2%" y="38%" rotate={-20} size={20} />
      <Leaf x="92%" y="35%" rotate={25} size={18} />
      <Leaf x="12%" y="70%" rotate={-35} size={16} />
      <Leaf x="84%" y="72%" rotate={40} size={17} />
      <Leaf x="22%" y="2%" rotate={10} size={14} />
      <Leaf x="76%" y="0%" rotate={-15} size={15} />

      {/* ── Sparkle particles near lantern ── */}
      {[
        { x: "43%", y: "50%", d: 0 },
        { x: "55%", y: "48%", d: 0.7 },
        { x: "40%", y: "60%", d: 1.3 },
        { x: "58%", y: "58%", d: 0.4 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/35"
          style={{ top: s.y, left: s.x }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.d }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
