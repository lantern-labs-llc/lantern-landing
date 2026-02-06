import { motion } from "framer-motion";

/**
 * Hero illustration: Two-part scene.
 * Left: Standalone chat interface with abstract bars + map bubble.
 * Right: Main street with storefronts and people.
 * Bold arcing lines connect chat to people (rendered last / on top).
 */

const people = [
  { tx: 280, ty: 310, color: "hsl(21 78% 57%)", delay: 0.9 },
  { tx: 340, ty: 325, color: "hsl(107 18% 52%)", delay: 1.0 },
  { tx: 410, ty: 318, color: "hsl(93 33% 25%)", delay: 1.1 },
  { tx: 470, ty: 330, color: "hsl(21 78% 62%)", delay: 1.3 },
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

          {/* Cloud icon (top-left, fluffy, no face) */}
          <g transform="translate(44, 86)">
            <ellipse cx="10" cy="13" rx="10" ry="6.5" fill="hsl(107 18% 72%)" />
            <circle cx="4" cy="9" r="5.5" fill="hsl(107 18% 72%)" />
            <circle cx="10" cy="5" r="6.5" fill="hsl(107 18% 72%)" />
            <circle cx="17" cy="7" r="5" fill="hsl(107 18% 72%)" />
            <circle cx="21" cy="11" r="4" fill="hsl(107 18% 72%)" />
          </g>

          {/* Title text placeholders */}
          <rect x="72" y="92" width="55" height="4" rx="2" fill="hsl(40 33% 93%)" opacity="0.6" />
          <rect x="72" y="100" width="35" height="3" rx="1.5" fill="hsl(40 33% 93%)" opacity="0.35" />

          {/* ── Chat bubbles (abstract bars) ── */}

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
          <rect x="45" y="246" width="120" height="70" rx="12" fill="hsl(200 30% 94%)" />
          <rect x="45" y="246" width="120" height="70" rx="12" fill="none" stroke="hsl(107 18% 52%)" strokeWidth="1.2" opacity="0.3" />

          {/* Water body (top-right of map) */}
          <path d="M120 246C130 246 145 246 155 246C162 246 165 249 165 255L165 275C155 272 140 268 120 275L120 246Z" fill="hsl(200 50% 78%)" opacity="0.45" />

          {/* Streets — horizontal */}
          <line x1="48" y1="262" x2="118" y2="262" stroke="hsl(40 18% 82%)" strokeWidth="3" />
          <line x1="48" y1="278" x2="118" y2="278" stroke="hsl(40 18% 82%)" strokeWidth="2.5" />
          <line x1="48" y1="292" x2="118" y2="292" stroke="hsl(40 18% 82%)" strokeWidth="2" />
          <line x1="48" y1="305" x2="118" y2="305" stroke="hsl(40 18% 82%)" strokeWidth="1.5" />

          {/* Streets — vertical */}
          <line x1="68" y1="250" x2="68" y2="312" stroke="hsl(40 18% 82%)" strokeWidth="2.5" />
          <line x1="95" y1="250" x2="95" y2="312" stroke="hsl(40 18% 82%)" strokeWidth="3" />
          <line x1="118" y1="250" x2="118" y2="312" stroke="hsl(40 18% 82%)" strokeWidth="2" />

          {/* Blocks (land between streets) */}
          <rect x="50" y="264" width="16" height="12" rx="1.5" fill="hsl(40 20% 88%)" opacity="0.5" />
          <rect x="70" y="264" width="23" height="12" rx="1.5" fill="hsl(40 20% 86%)" opacity="0.45" />
          <rect x="50" y="280" width="16" height="10" rx="1.5" fill="hsl(40 20% 88%)" opacity="0.4" />
          <rect x="70" y="280" width="23" height="10" rx="1.5" fill="hsl(40 20% 86%)" opacity="0.5" />
          <rect x="97" y="264" width="19" height="12" rx="1.5" fill="hsl(107 15% 88%)" opacity="0.4" />
          <rect x="97" y="280" width="19" height="10" rx="1.5" fill="hsl(107 15% 86%)" opacity="0.45" />

          {/* Green patch / park */}
          <ellipse cx="60" cy="302" rx="10" ry="5" fill="hsl(107 25% 70%)" opacity="0.35" />

          {/* Map pin */}
          <g transform="translate(88, 267)">
            <path d="M0 -8C-4 -8 -7 -5 -7 -2C-7 2.5 0 8 0 8C0 8 7 2.5 7 -2C7 -5 4 -8 0 -8Z"
              fill="hsl(21 78% 57%)" />
            <circle cx="0" cy="-2.5" r="2.2" fill="hsl(40 33% 97%)" />
          </g>
          {/* Pin glow */}
          <motion.circle
            cx="88" cy="267" r="10"
            fill="hsl(21 78% 57%)" opacity="0.08"
            animate={{ r: [10, 14, 10], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Input bar at bottom */}
          <rect x="42" y="326" width="120" height="22" rx="11" fill="hsl(40 25% 90%)"
            stroke="hsl(80 8% 78%)" strokeWidth="1" />
          <rect x="52" y="335" width="40" height="3" rx="1.5" fill="hsl(80 8% 78%)" opacity="0.5" />
          <circle cx="174" cy="337" r="8" fill="hsl(21 78% 57%)" opacity="0.25" />
          <path d="M171 337L177 337M174 334L174 340" stroke="hsl(21 78% 57%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </motion.g>

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

        {/* ═══ PEOPLE (rendered after buildings so they're in front) ═══ */}
        {people.map((p, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: p.delay }}
          >
            <g transform={`translate(${p.tx}, ${p.ty})`}>
              {/* Shadow */}
              <ellipse cx="0" cy="48" rx="9" ry="3" fill="hsl(93 33% 18%)" opacity="0.08" />
              {/* Head */}
              <circle cx="0" cy="0" r="7" fill={p.color} />
              {/* Neck */}
              <rect x="-2.5" y="6" width="5" height="5" rx="1" fill={p.color} />
              {/* Torso */}
              <path d="M-10 14C-10 11 -6 9 0 9C6 9 10 11 10 14L10 30C10 32 6 33 0 33C-6 33 -10 32 -10 30Z" fill={p.color} />
              {/* Arms */}
              <path d="M-10 15L-14 26C-14.5 27.5 -13 28 -12 27L-10 22" fill={p.color} opacity="0.85" />
              <path d="M10 15L14 26C14.5 27.5 13 28 12 27L10 22" fill={p.color} opacity="0.85" />
              {/* Legs */}
              <rect x="-6" y="32" width="5" height="14" rx="2" fill={p.color} opacity="0.9" />
              <rect x="1" y="32" width="5" height="14" rx="2" fill={p.color} opacity="0.9" />
            </g>
          </motion.g>
        ))}

        {/* ═══ ARCING LINES — rendered LAST so they're on top of everything ═══ */}
        {people.map((p, i) => {
          const startX = 210;
          const startY = 260;
          const endX = p.tx;
          const endY = p.ty - 5;
          const cpx = (startX + endX) / 2;
          const cpy = Math.min(startY, endY) - 50 - i * 18;
          return (
            <motion.path
              key={`line-${i}`}
              d={`M${startX} ${startY} Q${cpx} ${cpy} ${endX} ${endY}`}
              stroke="hsl(21 78% 57%)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.12, ease: "easeOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default HeroIllustration;
