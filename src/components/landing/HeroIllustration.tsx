import { motion } from "framer-motion";

/**
 * Beacon / Magnet metaphor illustration:
 * A warm glowing lantern at center with stylized human silhouettes
 * being drawn toward it along curved paths — like a gravity well.
 * Communicates "customers come to YOU."
 */

/* ── Stylized person silhouette ── */
const PersonSilhouette = ({
  color,
  size,
  flip,
}: {
  color: string;
  size: number;
  flip?: boolean;
}) => (
  <svg
    viewBox="0 0 40 56"
    fill="none"
    width={size}
    height={size * 1.4}
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
  >
    {/* Head */}
    <circle cx="20" cy="12" r="10" fill={color} />
    {/* Body — friendly rounded blob */}
    <path
      d="M8 28C8 22 13 18 20 18C27 18 32 22 32 28L34 50C34 54 28 56 20 56C12 56 6 54 6 50L8 28Z"
      fill={color}
    />
  </svg>
);

/* ── Curved attraction paths ── */
const AttractionPath = ({
  d,
  delay,
  color,
}: {
  d: string;
  delay: number;
  color: string;
}) => (
  <motion.path
    d={d}
    stroke={color}
    strokeWidth="1.5"
    strokeDasharray="6 6"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.35 }}
    transition={{ duration: 1.8, delay, ease: "easeOut" }}
  />
);

/* ── People flowing toward the lantern ── */
interface FlowingPerson {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  flip?: boolean;
  // motion toward center
  dx: number;
  dy: number;
}

const people: FlowingPerson[] = [
  // Top-left cluster
  { x: 2, y: 8, size: 28, color: "hsl(21 78% 57%)", delay: 0.3, dx: 6, dy: 8 },
  { x: 10, y: 22, size: 34, color: "hsl(107 18% 52%)", delay: 0.5, dx: 5, dy: 5 },
  // Left
  { x: 0, y: 48, size: 30, color: "hsl(93 33% 18%)", delay: 0.7, dx: 8, dy: 3 },
  // Bottom-left
  { x: 12, y: 72, size: 32, color: "hsl(21 78% 57%)", delay: 0.4, flip: true, dx: 5, dy: -4 },
  { x: 28, y: 82, size: 26, color: "hsl(107 18% 52%)", delay: 0.9, dx: 3, dy: -6 },
  // Top-right
  { x: 72, y: 6, size: 30, color: "hsl(107 18% 52%)", delay: 0.6, flip: true, dx: -5, dy: 7 },
  { x: 82, y: 20, size: 26, color: "hsl(93 33% 18%)", delay: 0.8, flip: true, dx: -7, dy: 5 },
  // Right
  { x: 85, y: 50, size: 32, color: "hsl(21 78% 57%)", delay: 0.45, flip: true, dx: -8, dy: 2 },
  // Bottom-right
  { x: 75, y: 75, size: 28, color: "hsl(93 33% 18%)", delay: 0.65, flip: true, dx: -5, dy: -5 },
  { x: 60, y: 85, size: 24, color: "hsl(107 18% 52%)", delay: 1.0, flip: true, dx: -2, dy: -7 },
];

/* ── Curved path data connecting people to center ── */
const pathData = [
  "M80 60 Q120 100 200 200",
  "M110 130 Q140 160 200 200",
  "M60 220 Q100 230 200 200",
  "M100 320 Q130 280 200 200",
  "M150 370 Q170 310 200 210",
  "M320 50 Q280 90 200 200",
  "M340 130 Q300 150 200 200",
  "M350 220 Q300 230 200 200",
  "M310 320 Q280 280 200 200",
  "M270 360 Q240 310 200 210",
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "1" }}>
      {/* Attraction paths SVG layer */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {pathData.map((d, i) => (
          <AttractionPath
            key={i}
            d={d}
            delay={people[i]?.delay ?? 0.5}
            color={`hsl(21 78% 57%)`}
          />
        ))}
      </svg>

      {/* Ambient glow behind lantern */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(21 78% 57% / 0.15) 0%, hsl(45 90% 70% / 0.08) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central Lantern */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ width: "28%" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <svg viewBox="0 0 100 180" fill="none" className="w-full h-full">
          {/* Warm light rays */}
          <motion.g
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 50 + Math.cos(rad) * 42;
              const y2 = 52 + Math.sin(rad) * 42;
              return (
                <line
                  key={angle}
                  x1="50"
                  y1="52"
                  x2={x2}
                  y2={y2}
                  stroke="hsl(45 90% 70%)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              );
            })}
          </motion.g>

          {/* Hook */}
          <path
            d="M45 20C45 12 48 8 50 6C52 8 55 12 55 20"
            stroke="hsl(93 33% 18%)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cap */}
          <rect x="36" y="22" width="28" height="5" rx="2.5" fill="hsl(93 33% 18%)" />

          {/* Body — rounded, warm, friendly */}
          <rect
            x="34"
            y="27"
            width="32"
            height="44"
            rx="8"
            fill="hsl(40 33% 93%)"
            stroke="hsl(93 33% 18%)"
            strokeWidth="2.5"
          />

          {/* Cross panes (subtle) */}
          <line x1="50" y1="29" x2="50" y2="69" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.15" />
          <line x1="36" y1="49" x2="64" y2="49" stroke="hsl(93 33% 18%)" strokeWidth="1" opacity="0.15" />

          {/* Flame layers */}
          <motion.ellipse
            cx="50"
            cy="50"
            rx="10"
            ry="14"
            fill="hsl(45 90% 70%)"
            opacity="0.35"
            animate={{ ry: [14, 16, 14], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="50"
            cy="51"
            rx="6"
            ry="9"
            fill="hsl(42 95% 80%)"
            opacity="0.6"
            animate={{ ry: [9, 11, 9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M50 42C48 46 48 52 50 56C52 52 52 46 50 42Z"
            fill="hsl(40 100% 92%)"
            opacity="0.9"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Bottom cap */}
          <rect x="36" y="71" width="28" height="5" rx="2.5" fill="hsl(93 33% 18%)" />

          {/* Post */}
          <rect x="46" y="76" width="8" height="80" rx="4" fill="hsl(93 33% 18%)" />
          {/* Ring detail */}
          <rect x="43" y="84" width="14" height="4" rx="2" fill="hsl(93 33% 18%)" />

          {/* Base */}
          <ellipse cx="50" cy="156" rx="20" ry="6" fill="hsl(93 33% 18%)" />
          <ellipse cx="50" cy="160" rx="26" ry="5" fill="hsl(93 33% 18%)" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Flowing people */}
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
            animate={{
              x: [0, p.dx, 0],
              y: [0, p.dy, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            <PersonSilhouette
              color={p.color}
              size={p.size}
              flip={p.flip}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Sparkle particles near center */}
      {[
        { x: "42%", y: "38%", d: 0 },
        { x: "56%", y: "42%", d: 0.6 },
        { x: "38%", y: "55%", d: 1.2 },
        { x: "58%", y: "52%", d: 0.9 },
        { x: "48%", y: "35%", d: 1.5 },
      ].map((spark, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
          style={{ top: spark.y, left: spark.x }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: spark.d,
          }}
        />
      ))}
    </div>
  );
};

export default HeroIllustration;
