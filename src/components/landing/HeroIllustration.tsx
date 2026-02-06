import { motion } from "framer-motion";

/**
 * Hero illustration: A clearly winding road (yellow-brick-road style) snakes
 * from the horizon to the foreground. A large friendly lantern glows at the
 * bottom-center. People are scattered randomly along the landscape, with
 * dashed magnetic attractor lines pulling them toward the lantern.
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

/* ── People scattered randomly across the scene ── */
interface ScatteredPerson {
  x: number; y: number; size: number; color: string; delay: number; flip?: boolean;
}

const people: ScatteredPerson[] = [
  // Far
  { x: 18, y: 12, size: 13, color: "hsl(21 78% 67%)", delay: 1.0 },
  { x: 72, y: 10, size: 12, color: "hsl(107 18% 52%)", delay: 1.1, flip: true },
  { x: 8, y: 22, size: 14, color: "hsl(93 33% 25%)", delay: 0.9 },
  { x: 82, y: 18, size: 13, color: "hsl(21 78% 57%)", delay: 0.95, flip: true },
  // Mid
  { x: 5, y: 38, size: 20, color: "hsl(107 22% 42%)", delay: 0.7 },
  { x: 85, y: 35, size: 18, color: "hsl(21 78% 62%)", delay: 0.75, flip: true },
  { x: 25, y: 45, size: 22, color: "hsl(21 78% 57%)", delay: 0.6 },
  { x: 70, y: 42, size: 19, color: "hsl(107 18% 52%)", delay: 0.65, flip: true },
  // Close
  { x: 2, y: 58, size: 28, color: "hsl(93 33% 18%)", delay: 0.4 },
  { x: 80, y: 55, size: 26, color: "hsl(21 78% 57%)", delay: 0.45, flip: true },
  { x: 15, y: 70, size: 32, color: "hsl(107 22% 42%)", delay: 0.3 },
  { x: 75, y: 72, size: 30, color: "hsl(21 78% 62%)", delay: 0.35, flip: true },
];

/* Lantern center in SVG coords (where attractor lines converge) */
const LANTERN_CX = 200;
const LANTERN_CY = 360;

/* Build a curved attractor path from person to lantern */
const attractorPath = (px: number, py: number) => {
  // Convert percent to SVG coords (400x420 viewBox)
  const sx = (px / 100) * 400 + 15;
  const sy = (py / 100) * 420 + 10;
  // Control point — offset sideways for a nice curve
  const cpx = (sx + LANTERN_CX) / 2 + (sx < LANTERN_CX ? -40 : 40);
  const cpy = (sy + LANTERN_CY) / 2;
  return `M${sx} ${sy} Q${cpx} ${cpy} ${LANTERN_CX} ${LANTERN_CY}`;
};

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "0.95" }}>
      {/* ── Road + attractor lines + scenery ── */}
      <svg
        viewBox="0 0 400 420"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Winding road — S-curve from horizon to foreground ── */}
        {/* Road surface */}
        <path
          d="M185 30 C150 80, 260 130, 240 180
             C220 230, 120 260, 140 310
             C160 360, 100 390, 60 420
             L340 420
             C300 390, 240 360, 260 310
             C280 260, 380 230, 360 180
             C340 130, 250 80, 215 30 Z"
          fill="hsl(40 28% 83%)"
          opacity="0.5"
        />
        {/* Road edges */}
        <path
          d="M185 30 C150 80, 260 130, 240 180
             C220 230, 120 260, 140 310
             C160 360, 100 390, 60 420"
          stroke="hsl(40 20% 72%)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M215 30 C250 80, 340 130, 360 180
             C380 230, 280 260, 260 310
             C240 360, 300 390, 340 420"
          stroke="hsl(40 20% 72%)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />

        {/* Center line — dashed, follows the S-curve */}
        <path
          d="M200 30 C200 80, 300 130, 300 180
             C300 230, 200 260, 200 310
             C200 360, 200 390, 200 420"
          stroke="hsl(40 18% 68%)"
          strokeWidth="2.5"
          strokeDasharray="12 10"
          fill="none"
          opacity="0.5"
        />

        {/* Grass tufts */}
        {[
          { x: 135, y: 150 }, { x: 370, y: 170 },
          { x: 100, y: 260 }, { x: 300, y: 280 },
          { x: 55, y: 370 }, { x: 350, y: 360 },
          { x: 165, y: 90 }, { x: 240, y: 100 },
        ].map((g, i) => (
          <g key={i} opacity="0.3">
            <path d={`M${g.x} ${g.y}C${g.x - 3} ${g.y - 12} ${g.x} ${g.y - 16} ${g.x + 3} ${g.y - 8}`}
              stroke="hsl(107 18% 52%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d={`M${g.x + 5} ${g.y}C${g.x + 3} ${g.y - 10} ${g.x + 7} ${g.y - 14} ${g.x + 10} ${g.y - 6}`}
              stroke="hsl(107 18% 52%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        ))}

        {/* Tiny roadside flowers */}
        {[
          { cx: 140, cy: 130, c: "hsl(21 78% 67%)" },
          { cx: 365, cy: 190, c: "hsl(45 85% 65%)" },
          { cx: 105, cy: 280, c: "hsl(21 78% 62%)" },
          { cx: 295, cy: 300, c: "hsl(45 85% 65%)" },
          { cx: 50, cy: 380, c: "hsl(21 78% 67%)" },
        ].map((f, i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => {
              const rad = (a * Math.PI) / 180;
              return <circle key={a} cx={f.cx + Math.cos(rad) * 3.5} cy={f.cy + Math.sin(rad) * 3.5} r="2" fill={f.c} opacity="0.45" />;
            })}
            <circle cx={f.cx} cy={f.cy} r="1.5" fill="hsl(45 90% 70%)" opacity="0.55" />
          </g>
        ))}

        {/* ── Magnetic attractor lines from each person to lantern ── */}
        {people.map((p, i) => (
          <motion.path
            key={i}
            d={attractorPath(p.x, p.y)}
            stroke="hsl(21 78% 57%)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.22 }}
            transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* ── Lantern glow ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: "55%", height: "30%", bottom: "6%",
          background: "radial-gradient(ellipse, hsl(45 90% 70% / 0.2) 0%, hsl(21 78% 57% / 0.06) 50%, transparent 80%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Lantern post ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{ width: "28%", bottom: "0%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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

      {/* ── People scattered around the scene ── */}
      {people.map((p, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              x: [0, (LANTERN_CX / 400 * 100 - p.x) * 0.06, 0],
              y: [0, (LANTERN_CY / 420 * 100 - p.y) * 0.04, 0],
            }}
            transition={{ duration: 4 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Person color={p.color} size={p.size} flip={p.flip} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Sparkles near lantern ── */}
      {[
        { x: "44%", y: "62%", d: 0 },
        { x: "54%", y: "58%", d: 0.8 },
        { x: "42%", y: "72%", d: 1.4 },
        { x: "56%", y: "68%", d: 0.5 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{ top: s.y, left: s.x }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: s.d }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
