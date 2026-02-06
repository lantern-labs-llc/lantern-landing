import { motion } from "framer-motion";

/**
 * Hero illustration: Clean two-part scene.
 * Left: A standalone chat interface with abstract message bars + a map bubble.
 * Right: A charming main street with storefronts and friendly silhouette people.
 * Arcing dashed lines connect the chat to each person.
 */

/* Person positions (for both rendering and attractor lines) */
const people = [
  { tx: 280, ty: 320, headR: 8, color: "hsl(21 78% 57%)", delay: 0.9 },
  { tx: 350, ty: 335, headR: 7, color: "hsl(107 18% 52%)", delay: 1.0 },
  { tx: 420, ty: 328, headR: 6.5, color: "hsl(93 33% 25%)", delay: 1.1 },
  { tx: 480, ty: 340, headR: 5.5, color: "hsl(21 78% 62%)", delay: 1.3 },
];

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: "1.1" }}>
      <svg
        viewBox="0 0 560 480"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ═══ GROUND ═══ */}
        <rect x="0" y="370" width="560" height="110" fill="hsl(40 25% 88%)" />
        <line x1="0" y1="370" x2="560" y2="370" stroke="hsl(40 18% 78%)" strokeWidth="1.5" />

        {/* ═══ LEFT SIDE — CHAT INTERFACE ═══ */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Phone / chat frame */}
          <rect x="30" y="80" width="180" height="280" rx="18" fill="hsl(40 33% 97%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2.5" />

          {/* Top bar */}
          <rect x="30" y="80" width="180" height="36" rx="18" fill="hsl(93 33% 25%)" />
          <rect x="30" y="100" width="180" height="16" fill="hsl(93 33% 25%)" />

          {/* Cloud icon (top-left of chat) */}
          <g transform="translate(46, 88)">
            <ellipse cx="9" cy="11" rx="9" ry="6" fill="hsl(107 18% 52%)" />
            <circle cx="5" cy="8" r="5" fill="hsl(107 18% 52%)" />
            <circle cx="12" cy="6" r="6" fill="hsl(107 18% 52%)" />
            <circle cx="16" cy="9" r="4" fill="hsl(107 18% 52%)" />
            {/* Tiny face on cloud */}
            <circle cx="8" cy="10" r="1" fill="white" />
            <circle cx="13" cy="10" r="1" fill="white" />
            <path d="M8 13C9 14 12 14 13 13" stroke="white" strokeWidth="0.7" strokeLinecap="round" fill="none" />
          </g>

          {/* Title text placeholders */}
          <rect x="72" y="92" width="55" height="4" rx="2" fill="hsl(40 33% 93%)" opacity="0.6" />
          <rect x="72" y="100" width="35" height="3" rx="1.5" fill="hsl(40 33% 93%)" opacity="0.35" />

          {/* ── Chat bubbles (abstract bars, no real text) ── */}

          {/* User message 1 */}
          <rect x="100" y="130" width="96" height="26" rx="11" fill="hsl(21 78% 57%)" opacity="0.18" />
          <rect x="112" y="139" width="52" height="3.5" rx="1.5" fill="hsl(21 78% 57%)" opacity="0.45" />
          <rect x="112" y="146" width="32" height="3" rx="1.5" fill="hsl(21 78% 57%)" opacity="0.3" />

          {/* Bot response 1 */}
          <rect x="45" y="168" width="110" height="30" rx="11" fill="hsl(107 18% 52%)" opacity="0.12" />
          <rect x="56" y="177" width="65" height="3.5" rx="1.5" fill="hsl(107 18% 52%)" opacity="0.4" />
          <rect x="56" y="184" width="42" height="3" rx="1.5" fill="hsl(107 18% 52%)" opacity="0.28" />

          {/* User message 2 */}
          <rect x="110" y="210" width="82" height="24" rx="11" fill="hsl(21 78% 57%)" opacity="0.15" />
          <rect x="120" y="218" width="44" height="3.5" rx="1.5" fill="hsl(21 78% 57%)" opacity="0.4" />
          <rect x="120" y="225" width="28" height="3" rx="1.5" fill="hsl(21 78% 57%)" opacity="0.25" />

          {/* Bot response 2 — MAP bubble */}
          <rect x="45" y="246" width="120" height="60" rx="12" fill="hsl(107 18% 52%)" opacity="0.08" />
          <rect x="45" y="246" width="120" height="60" rx="12" fill="none" stroke="hsl(107 18% 52%)" strokeWidth="1.2" opacity="0.25" />
          {/* Map background — criss-cross streets */}
          <line x1="55" y1="260" x2="155" y2="260" stroke="hsl(40 18% 78%)" strokeWidth="1" opacity="0.4" />
          <line x1="55" y1="275" x2="155" y2="275" stroke="hsl(40 18% 78%)" strokeWidth="1" opacity="0.4" />
          <line x1="55" y1="290" x2="155" y2="290" stroke="hsl(40 18% 78%)" strokeWidth="0.8" opacity="0.3" />
          <line x1="75" y1="250" x2="75" y2="302" stroke="hsl(40 18% 78%)" strokeWidth="0.8" opacity="0.35" />
          <line x1="105" y1="250" x2="105" y2="302" stroke="hsl(40 18% 78%)" strokeWidth="1" opacity="0.4" />
          <line x1="135" y1="250" x2="135" y2="302" stroke="hsl(40 18% 78%)" strokeWidth="0.8" opacity="0.35" />
          {/* Map pin */}
          <g transform="translate(102, 258)">
            <path d="M0 -10C-5 -10 -8 -6 -8 -2C-8 3 0 10 0 10C0 10 8 3 8 -2C8 -6 5 -10 0 -10Z"
              fill="hsl(21 78% 57%)" opacity="0.8" />
            <circle cx="0" cy="-3" r="2.5" fill="hsl(40 33% 97%)" />
          </g>
          {/* Subtle glow around pin */}
          <motion.circle
            cx="102" cy="258" r="10"
            fill="hsl(21 78% 57%)" opacity="0.06"
            animate={{ r: [10, 14, 10], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Input bar at bottom */}
          <rect x="42" y="318" width="120" height="22" rx="11" fill="hsl(40 25% 90%)"
            stroke="hsl(80 8% 78%)" strokeWidth="1" />
          <rect x="52" y="327" width="40" height="3" rx="1.5" fill="hsl(80 8% 78%)" opacity="0.5" />
          <circle cx="174" cy="329" r="8" fill="hsl(21 78% 57%)" opacity="0.25" />
          <path d="M171 329L177 329M174 326L174 332" stroke="hsl(21 78% 57%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

          {/* Typing indicator */}
          <rect x="42" y="345" width="40" height="14" rx="7" fill="hsl(107 18% 52%)" opacity="0.08" />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={54 + i * 8}
              cy="352"
              r="2"
              fill="hsl(107 18% 52%)"
              opacity="0.3"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </motion.g>

        {/* ═══ ARCING ATTRACTOR LINES — chat to each person ═══ */}
        {people.map((p, i) => {
          const startX = 210;
          const startY = 260;
          const endX = p.tx + 12;
          const endY = p.ty + p.headR;
          // Curve upward for a nice arc
          const cpx = (startX + endX) / 2;
          const cpy = Math.min(startY, endY) - 40 - i * 15;
          return (
            <motion.path
              key={i}
              d={`M${startX} ${startY} Q${cpx} ${cpy} ${endX} ${endY}`}
              stroke="hsl(21 78% 57%)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 1.8, delay: 0.6 + i * 0.15, ease: "easeOut" }}
            />
          );
        })}

        {/* ═══ RIGHT SIDE — MAIN STREET ═══ */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Building 1 */}
          <rect x="270" y="195" width="90" height="175" rx="4" fill="hsl(40 30% 95%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2" />
          <path d="M265 198H365L360 218H270L265 198Z" fill="hsl(21 78% 62%)" opacity="0.65" />
          <rect x="282" y="228" width="28" height="30" rx="3" fill="hsl(45 85% 80%)" opacity="0.4"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <line x1="296" y1="228" x2="296" y2="258" stroke="hsl(93 33% 25%)" strokeWidth="0.8" opacity="0.3" />
          <rect x="320" y="228" width="28" height="30" rx="3" fill="hsl(45 85% 80%)" opacity="0.4"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <line x1="334" y1="228" x2="334" y2="258" stroke="hsl(93 33% 25%)" strokeWidth="0.8" opacity="0.3" />
          <rect x="300" y="305" width="30" height="65" rx="3" fill="hsl(93 33% 25%)" opacity="0.12" />
          <circle cx="325" cy="340" r="2" fill="hsl(93 33% 25%)" opacity="0.3" />
          <rect x="290" y="272" width="50" height="18" rx="4" fill="hsl(40 33% 93%)"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="298" y="278" width="34" height="3.5" rx="1.5" fill="hsl(93 33% 25%)" opacity="0.4" />

          {/* Building 2 */}
          <rect x="370" y="160" width="85" height="210" rx="4" fill="hsl(107 16% 91%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2" />
          <path d="M366 163H460L456 180H370L366 163Z" fill="hsl(107 18% 52%)" opacity="0.55" />
          <rect x="382" y="190" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="418" y="190" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="382" y="230" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="418" y="230" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="396" y="310" width="30" height="60" rx="3" fill="hsl(93 33% 25%)" opacity="0.12" />
          <circle cx="421" cy="342" r="2" fill="hsl(93 33% 25%)" opacity="0.3" />
          <rect x="388" y="272" width="46" height="18" rx="4" fill="hsl(40 33% 93%)"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="396" y="278" width="30" height="3.5" rx="1.5" fill="hsl(93 33% 25%)" opacity="0.4" />

          {/* Building 3 */}
          <rect x="465" y="210" width="95" height="160" rx="4" fill="hsl(40 30% 94%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2" />
          <path d="M461 213H560L557 228H465L461 213Z" fill="hsl(21 78% 67%)" opacity="0.5" />
          <rect x="478" y="240" width="22" height="24" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="510" y="240" width="22" height="24" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="490" y="315" width="26" height="55" rx="3" fill="hsl(93 33% 25%)" opacity="0.12" />

          {/* ═══ PEOPLE on the street ═══ */}
          {people.map((p, i) => {
            const bodyH = p.headR * 4.5;
            const bodyW = p.headR * 2.2;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: p.delay }}
              >
                <g transform={`translate(${p.tx}, ${p.ty})`}>
                  <ellipse cx={bodyW / 2} cy={p.headR + bodyH + 2} rx={bodyW * 0.7} ry={2.5} fill="hsl(93 33% 18%)" opacity="0.06" />
                  <circle cx={bodyW / 2} cy={p.headR} r={p.headR} fill={p.color} />
                  <path
                    d={`M${bodyW * 0.15} ${p.headR * 2.2}C${bodyW * 0.15} ${p.headR * 1.6} ${bodyW * 0.3} ${p.headR * 1.3} ${bodyW / 2} ${p.headR * 1.3}C${bodyW * 0.7} ${p.headR * 1.3} ${bodyW * 0.85} ${p.headR * 1.6} ${bodyW * 0.85} ${p.headR * 2.2}L${bodyW * 0.9} ${p.headR + bodyH}C${bodyW * 0.9} ${p.headR + bodyH + 2} ${bodyW * 0.7} ${p.headR + bodyH + 3} ${bodyW / 2} ${p.headR + bodyH + 3}C${bodyW * 0.3} ${p.headR + bodyH + 3} ${bodyW * 0.1} ${p.headR + bodyH + 2} ${bodyW * 0.1} ${p.headR + bodyH}L${bodyW * 0.15} ${p.headR * 2.2}Z`}
                    fill={p.color}
                  />
                </g>
              </motion.g>
            );
          })}

          {/* Bushes */}
          <ellipse cx="270" cy="370" rx="20" ry="10" fill="hsl(107 18% 52%)" opacity="0.2" />
          <ellipse cx="460" cy="372" rx="16" ry="8" fill="hsl(107 18% 52%)" opacity="0.18" />
          <ellipse cx="540" cy="370" rx="22" ry="10" fill="hsl(107 18% 52%)" opacity="0.15" />

          {/* Tiny flowers */}
          {[
            { cx: 290, cy: 368, c: "hsl(21 78% 67%)" },
            { cx: 470, cy: 368, c: "hsl(45 85% 65%)" },
          ].map((f, i) => (
            <g key={i}>
              {[0, 72, 144, 216, 288].map((a) => {
                const rad = (a * Math.PI) / 180;
                return <circle key={a} cx={f.cx + Math.cos(rad) * 3} cy={f.cy + Math.sin(rad) * 3} r="1.8" fill={f.c} opacity="0.4" />;
              })}
              <circle cx={f.cx} cy={f.cy} r="1.3" fill="hsl(45 90% 70%)" opacity="0.5" />
            </g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
