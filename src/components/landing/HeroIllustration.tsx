import { motion } from "framer-motion";

/**
 * Hero illustration: Clean two-part scene.
 * Left: A standalone chat interface with conversation bubbles.
 * Right: A charming main street with storefronts and a friendly person
 * stepping out from the chat side toward the street.
 */

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
          {/* Bot avatar dot */}
          <circle cx="55" cy="97" r="8" fill="hsl(107 18% 52%)" />
          <circle cx="53" cy="95" r="1.2" fill="white" />
          <circle cx="57" cy="95" r="1.2" fill="white" />
          <path d="M52 99C53 100.5 57 100.5 58 99" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" />
          {/* Title text */}
          <rect x="70" y="92" width="55" height="4" rx="2" fill="hsl(40 33% 93%)" opacity="0.6" />
          <rect x="70" y="100" width="35" height="3" rx="1.5" fill="hsl(40 33% 93%)" opacity="0.35" />

          {/* User message 1 */}
          <rect x="95" y="130" width="100" height="30" rx="12" fill="hsl(21 78% 57%)" opacity="0.18" />
          <text x="108" y="148" fontSize="9" fill="hsl(21 78% 50%)" fontFamily="DM Sans, sans-serif" fontWeight="500">
            Best pizza near me?
          </text>

          {/* Bot response 1 */}
          <rect x="45" y="172" width="115" height="38" rx="12" fill="hsl(107 18% 52%)" opacity="0.12" />
          <text x="56" y="188" fontSize="8" fill="hsl(93 33% 25%)" fontFamily="DM Sans, sans-serif">
            I'd recommend trying
          </text>
          <text x="56" y="200" fontSize="9" fill="hsl(93 33% 25%)" fontFamily="DM Sans, sans-serif" fontWeight="600">
            Mario's on Main St! ⭐
          </text>

          {/* User message 2 */}
          <rect x="105" y="222" width="90" height="26" rx="12" fill="hsl(21 78% 57%)" opacity="0.15" />
          <text x="116" y="239" fontSize="8.5" fill="hsl(21 78% 50%)" fontFamily="DM Sans, sans-serif" fontWeight="500">
            How do I get there?
          </text>

          {/* Bot response 2 — the recommendation with glow */}
          <motion.rect
            x="45" y="260" width="130" height="34" rx="12"
            fill="hsl(45 90% 70%)" opacity="0.15"
            animate={{ opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <rect x="45" y="260" width="130" height="34" rx="12"
            fill="none" stroke="hsl(21 78% 57%)" strokeWidth="1.2" opacity="0.35" />
          <text x="56" y="276" fontSize="8" fill="hsl(93 33% 25%)" fontFamily="DM Sans, sans-serif">
            Just step right through →
          </text>
          <text x="56" y="287" fontSize="7.5" fill="hsl(93 33% 25%)" fontFamily="DM Sans, sans-serif" opacity="0.5">
            It's waiting for you!
          </text>

          {/* Input bar at bottom */}
          <rect x="42" y="305" width="120" height="22" rx="11" fill="hsl(40 25% 90%)"
            stroke="hsl(80 8% 78%)" strokeWidth="1" />
          <rect x="52" y="314" width="40" height="3" rx="1.5" fill="hsl(80 8% 78%)" opacity="0.5" />
          <circle cx="174" cy="316" r="8" fill="hsl(21 78% 57%)" opacity="0.25" />
          <path d="M171 316L177 316M174 313L174 319" stroke="hsl(21 78% 57%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

          {/* Typing indicator dots */}
          <rect x="42" y="335" width="40" height="16" rx="8" fill="hsl(107 18% 52%)" opacity="0.08" />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={54 + i * 8}
              cy="343"
              r="2"
              fill="hsl(107 18% 52%)"
              opacity="0.3"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}
        </motion.g>

        {/* ═══ CONNECTING ARROW / PATH from chat to street ═══ */}
        <motion.path
          d="M210 290 C240 290, 260 310, 280 340"
          stroke="hsl(21 78% 57%)"
          strokeWidth="2"
          strokeDasharray="6 5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        />

        {/* ═══ RIGHT SIDE — MAIN STREET ═══ */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Building 1 — bakery/café */}
          <rect x="270" y="195" width="90" height="175" rx="4" fill="hsl(40 30% 95%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2" />
          {/* Awning */}
          <path d="M265 198H365L360 218H270L265 198Z" fill="hsl(21 78% 62%)" opacity="0.65" />
          {/* Windows */}
          <rect x="282" y="228" width="28" height="30" rx="3" fill="hsl(45 85% 80%)" opacity="0.4"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <line x1="296" y1="228" x2="296" y2="258" stroke="hsl(93 33% 25%)" strokeWidth="0.8" opacity="0.3" />
          <rect x="320" y="228" width="28" height="30" rx="3" fill="hsl(45 85% 80%)" opacity="0.4"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <line x1="334" y1="228" x2="334" y2="258" stroke="hsl(93 33% 25%)" strokeWidth="0.8" opacity="0.3" />
          {/* Door */}
          <rect x="300" y="305" width="30" height="65" rx="3" fill="hsl(93 33% 25%)" opacity="0.12" />
          <circle cx="325" cy="340" r="2" fill="hsl(93 33% 25%)" opacity="0.3" />
          {/* Sign */}
          <rect x="290" y="272" width="50" height="18" rx="4" fill="hsl(40 33% 93%)"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="298" y="278" width="34" height="3.5" rx="1.5" fill="hsl(93 33% 25%)" opacity="0.4" />

          {/* Building 2 — taller, different color */}
          <rect x="370" y="160" width="85" height="210" rx="4" fill="hsl(107 16% 91%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2" />
          {/* Awning */}
          <path d="M366 163H460L456 180H370L366 163Z" fill="hsl(107 18% 52%)" opacity="0.55" />
          {/* Windows — two rows */}
          <rect x="382" y="190" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="418" y="190" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="382" y="230" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="418" y="230" width="24" height="26" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          {/* Door */}
          <rect x="396" y="310" width="30" height="60" rx="3" fill="hsl(93 33% 25%)" opacity="0.12" />
          <circle cx="421" cy="342" r="2" fill="hsl(93 33% 25%)" opacity="0.3" />
          {/* Sign */}
          <rect x="388" y="272" width="46" height="18" rx="4" fill="hsl(40 33% 93%)"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="396" y="278" width="30" height="3.5" rx="1.5" fill="hsl(93 33% 25%)" opacity="0.4" />

          {/* Building 3 — peeking from edge, shorter */}
          <rect x="465" y="210" width="95" height="160" rx="4" fill="hsl(40 30% 94%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2" />
          <path d="M461 213H560L557 228H465L461 213Z" fill="hsl(21 78% 67%)" opacity="0.5" />
          <rect x="478" y="240" width="22" height="24" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="510" y="240" width="22" height="24" rx="3" fill="hsl(45 85% 80%)" opacity="0.35"
            stroke="hsl(93 33% 25%)" strokeWidth="1" />
          <rect x="490" y="315" width="26" height="55" rx="3" fill="hsl(93 33% 25%)" opacity="0.12" />

          {/* ═══ PERSON on the street — simple, friendly silhouette ═══ */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <g transform="translate(280, 320)">
              <ellipse cx="12" cy="52" rx="10" ry="3" fill="hsl(93 33% 18%)" opacity="0.06" />
              <circle cx="12" cy="6" r="8" fill="hsl(21 78% 57%)" />
              <path d="M4 18C4 13 7 10 12 10C17 10 20 13 20 18L21 44C21 47 17 48 12 48C7 48 3 47 3 44L4 18Z"
                fill="hsl(21 78% 57%)" />
            </g>
          </motion.g>

          {/* Second person further down */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <g transform="translate(380, 330)">
              <circle cx="9" cy="5" r="6.5" fill="hsl(107 18% 52%)" />
              <path d="M3 15C3 11 5 9 9 9C13 9 15 11 15 15L16 36C16 38 13 39 9 39C5 39 2 38 2 36L3 15Z"
                fill="hsl(107 18% 52%)" />
            </g>
          </motion.g>

          {/* Third person, smaller / further */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <g transform="translate(450, 340)">
              <circle cx="7" cy="4" r="5" fill="hsl(93 33% 25%)" />
              <path d="M3 12C3 9 4 8 7 8C10 8 11 9 11 12L12 28C12 30 10 30 7 30C4 30 2 30 2 28L3 12Z"
                fill="hsl(93 33% 25%)" />
            </g>
          </motion.g>

          {/* Bushes / greenery */}
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
