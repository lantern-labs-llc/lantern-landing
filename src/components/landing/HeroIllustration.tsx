import { motion } from "framer-motion";

/**
 * Hero illustration: A winding road from the horizon leads to a large,
 * friendly lantern post in the foreground. People walk along the road,
 * drawn toward the warm glow.
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
    <path
      d="M31 30C34 28 37 26 38 23"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

interface WalkingPerson {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  flip?: boolean;
  dx: number;
  dy: number;
}

const walkers: WalkingPerson[] = [
  // Far away (small, near horizon)
  { x: 44, y: 18, size: 12, color: "hsl(21 78% 67%)", delay: 1.0, dx: 1, dy: 2 },
  { x: 52, y: 20, size: 11, color: "hsl(107 18% 52%)", delay: 1.1, flip: true, dx: -1, dy: 2 },
  // Mid-distance
  { x: 35, y: 30, size: 16, color: "hsl(93 33% 25%)", delay: 0.8, dx: 2, dy: 3 },
  { x: 58, y: 32, size: 15, color: "hsl(21 78% 57%)", delay: 0.85, flip: true, dx: -2, dy: 3 },
  // Approaching
  { x: 26, y: 44, size: 22, color: "hsl(107 22% 42%)", delay: 0.6, dx: 3, dy: 3 },
  { x: 65, y: 46, size: 20, color: "hsl(21 78% 62%)", delay: 0.65, flip: true, dx: -3, dy: 3 },
  // Close
  { x: 14, y: 60, size: 28, color: "hsl(21 78% 57%)", delay: 0.4, dx: 4, dy: 2 },
  { x: 74, y: 62, size: 26, color: "hsl(107 18% 52%)", delay: 0.45, flip: true, dx: -4, dy: 2 },
  // Foreground flanking the lantern
  { x: 6, y: 76, size: 34, color: "hsl(93 33% 18%)", delay: 0.3, dx: 4, dy: -1 },
  { x: 76, y: 78, size: 32, color: "hsl(107 22% 42%)", delay: 0.35, flip: true, dx: -4, dy: -1 },
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "0.95" }}>
      {/* ── Road + scenery base layer ── */}
      <svg
        viewBox="0 0 400 420"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Sky hint / horizon warmth */}
        <ellipse cx="200" cy="70" rx="160" ry="40" fill="hsl(45 85% 75%)" opacity="0.08" />

        {/* ── Winding road ── */}
        {/* Road shadow / edge */}
        <path
          d="M185 60 C175 100, 155 130, 145 170 C130 220, 100 260, 70 310 C50 340, 20 370, -10 420
             L410 420 C380 370, 350 340, 330 310 C300 260, 270 220, 255 170 C245 130, 225 100, 215 60 Z"
          fill="hsl(40 20% 80%)"
          opacity="0.4"
        />
        {/* Road surface */}
        <path
          d="M190 60 C180 100, 165 130, 155 170 C142 220, 120 260, 95 310 C78 340, 55 370, 30 420
             L370 420 C345 370, 322 340, 305 310 C280 260, 258 220, 245 170 C235 130, 220 100, 210 60 Z"
          fill="hsl(40 25% 86%)"
          opacity="0.55"
        />

        {/* Center dashes — perspective-scaled */}
        {[
          { y: 80, w: 8, h: 3 },
          { y: 110, w: 9, h: 3 },
          { y: 145, w: 10, h: 3.5 },
          { y: 185, w: 12, h: 4 },
          { y: 230, w: 14, h: 4 },
          { y: 275, w: 16, h: 4.5 },
          { y: 320, w: 18, h: 5 },
          { y: 365, w: 22, h: 5 },
          { y: 405, w: 26, h: 5 },
        ].map((dash, i) => (
          <rect
            key={i}
            x={200 - dash.w / 2}
            y={dash.y}
            width={dash.w}
            height={dash.h}
            rx={dash.h / 2}
            fill="hsl(40 18% 74%)"
            opacity="0.5"
          />
        ))}

        {/* Grass / ground along sides */}
        {[
          { x: 130, y: 200 }, { x: 268, y: 190 },
          { x: 90, y: 280 }, { x: 305, y: 270 },
          { x: 50, y: 350 }, { x: 345, y: 340 },
          { x: 160, y: 120 }, { x: 238, y: 115 },
        ].map((g, i) => (
          <g key={i} opacity="0.3">
            <path
              d={`M${g.x} ${g.y}C${g.x - 3} ${g.y - 12} ${g.x} ${g.y - 16} ${g.x + 3} ${g.y - 8}`}
              stroke="hsl(107 18% 52%)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${g.x + 5} ${g.y}C${g.x + 3} ${g.y - 10} ${g.x + 7} ${g.y - 14} ${g.x + 10} ${g.y - 6}`}
              stroke="hsl(107 18% 52%)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Tiny flowers along road edge */}
        {[
          { cx: 140, cy: 180, c: "hsl(21 78% 67%)" },
          { cx: 258, cy: 175, c: "hsl(45 85% 65%)" },
          { cx: 100, cy: 265, c: "hsl(21 78% 62%)" },
          { cx: 298, cy: 255, c: "hsl(45 85% 65%)" },
          { cx: 60, cy: 340, c: "hsl(21 78% 67%)" },
          { cx: 338, cy: 330, c: "hsl(107 18% 62%)" },
        ].map((f, i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => {
              const rad = (a * Math.PI) / 180;
              return (
                <circle
                  key={a}
                  cx={f.cx + Math.cos(rad) * 4}
                  cy={f.cy + Math.sin(rad) * 4}
                  r="2.5"
                  fill={f.c}
                  opacity="0.5"
                />
              );
            })}
            <circle cx={f.cx} cy={f.cy} r="1.8" fill="hsl(45 90% 70%)" opacity="0.6" />
          </g>
        ))}
      </svg>

      {/* ── Lantern glow ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: "60%",
          height: "35%",
          bottom: "5%",
          background:
            "radial-gradient(ellipse, hsl(45 90% 70% / 0.2) 0%, hsl(21 78% 57% / 0.06) 50%, transparent 80%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Large lantern post — foreground center ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-30"
        style={{ width: "30%", bottom: "0%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <svg viewBox="0 0 120 260" fill="none" className="w-full h-full">
          {/* Rays */}
          <motion.g
            animate={{ opacity: [0.12, 0.4, 0.12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1="60" y1="60"
                  x2={60 + Math.cos(rad) * 48}
                  y2={60 + Math.sin(rad) * 48}
                  stroke="hsl(45 85% 72%)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.g>

          {/* Ornamental hook */}
          <path
            d="M54 26C50 18 52 10 60 8C68 10 70 18 66 26"
            stroke="hsl(93 33% 25%)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cap */}
          <path d="M42 28H78C80 28 80 32 78 34H42C40 34 40 28 42 28Z" fill="hsl(93 33% 25%)" rx="2" />

          {/* Lantern body — big, warm, rounded */}
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

          {/* Post — friendly tapered column */}
          <path d="M52 92L50 210C50 214 54 216 60 216C66 216 70 214 70 210L68 92" fill="hsl(93 33% 25%)" />

          {/* Post rings */}
          <rect x="47" y="102" width="26" height="5" rx="2.5" fill="hsl(93 33% 25%)" />
          <rect x="48" y="150" width="24" height="4" rx="2" fill="hsl(93 33% 25%)" />

          {/* Small vine accent */}
          <path d="M68 120C72 116 75 119 73 124C71 129 74 132 72 136"
            stroke="hsl(107 18% 52%)" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.45" />
          <circle cx="75" cy="118" r="2" fill="hsl(107 18% 52%)" opacity="0.35" />
          <circle cx="73" cy="130" r="1.6" fill="hsl(107 18% 52%)" opacity="0.3" />

          {/* Base */}
          <ellipse cx="60" cy="218" rx="30" ry="8" fill="hsl(93 33% 25%)" />
          <ellipse cx="60" cy="222" rx="36" ry="6" fill="hsl(93 33% 25%)" opacity="0.2" />
        </svg>
      </motion.div>

      {/* ── Walking people ── */}
      {walkers.map((p, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, x: p.flip ? 30 : -30, y: -15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        >
          <motion.div
            animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Person color={p.color} size={p.size} flip={p.flip} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Warm sparkles near lantern ── */}
      {[
        { x: "44%", y: "58%", d: 0 },
        { x: "54%", y: "55%", d: 0.8 },
        { x: "42%", y: "68%", d: 1.4 },
        { x: "56%", y: "65%", d: 0.5 },
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
