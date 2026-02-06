import { motion } from "framer-motion";

/**
 * Hero illustration: A large chat bubble opens like a doorway.
 * A happy person walks through it onto a sunny main-street sidewalk
 * with storefronts. The lantern post stands on the street as a beacon.
 */

const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: "1" }}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ═══ GROUND / SIDEWALK ═══ */}
        <rect x="0" y="340" width="500" height="160" fill="hsl(40 25% 88%)" rx="0" />
        {/* Sidewalk edge */}
        <line x1="0" y1="340" x2="500" y2="340" stroke="hsl(40 18% 78%)" strokeWidth="2" />
        {/* Cobblestone texture lines */}
        {[360, 380, 400, 420, 440, 460].map((y) => (
          <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="hsl(40 18% 82%)" strokeWidth="0.8" opacity="0.4" />
        ))}
        {[60, 130, 200, 270, 340, 410, 470].map((x) => (
          <line key={x} x1={x} y1="340" x2={x} y2="500" stroke="hsl(40 18% 82%)" strokeWidth="0.6" opacity="0.3" />
        ))}

        {/* ═══ BACKGROUND STOREFRONTS (simple, charming) ═══ */}
        {/* Storefront 1 — far left */}
        <rect x="10" y="220" width="80" height="120" rx="4" fill="hsl(107 16% 90%)" stroke="hsl(93 33% 25%)" strokeWidth="1.5" />
        <rect x="24" y="280" width="24" height="60" rx="2" fill="hsl(93 33% 25%)" opacity="0.15" />
        <rect x="55" y="245" width="22" height="20" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        <rect x="20" y="245" width="22" height="20" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        {/* Awning */}
        <path d="M6 222H94L90 238H10L6 222Z" fill="hsl(21 78% 62%)" opacity="0.7" />

        {/* Storefront 2 — left-center */}
        <rect x="100" y="200" width="90" height="140" rx="4" fill="hsl(40 30% 94%)" stroke="hsl(93 33% 25%)" strokeWidth="1.5" />
        <rect x="120" y="270" width="28" height="70" rx="2" fill="hsl(93 33% 25%)" opacity="0.15" />
        <rect x="155" y="225" width="24" height="24" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        <rect x="112" y="225" width="24" height="24" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        {/* Awning */}
        <path d="M96 202H194L190 218H100L96 202Z" fill="hsl(107 18% 52%)" opacity="0.6" />

        {/* Storefront 3 — right-center (behind the chat bubble) */}
        <rect x="310" y="195" width="85" height="145" rx="4" fill="hsl(107 16% 90%)" stroke="hsl(93 33% 25%)" strokeWidth="1.5" />
        <rect x="332" y="265" width="26" height="75" rx="2" fill="hsl(93 33% 25%)" opacity="0.15" />
        <rect x="365" y="220" width="20" height="22" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        <rect x="318" y="220" width="20" height="22" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        <path d="M306 197H399L395 213H310L306 197Z" fill="hsl(21 78% 57%)" opacity="0.6" />

        {/* Storefront 4 — far right */}
        <rect x="405" y="215" width="85" height="125" rx="4" fill="hsl(40 30% 94%)" stroke="hsl(93 33% 25%)" strokeWidth="1.5" />
        <rect x="425" y="275" width="24" height="65" rx="2" fill="hsl(93 33% 25%)" opacity="0.15" />
        <rect x="458" y="240" width="22" height="20" rx="2" fill="hsl(45 85% 75%)" opacity="0.35" />
        <path d="M401 217H494L490 233H405L401 217Z" fill="hsl(107 18% 52%)" opacity="0.55" />

        {/* ═══ LANTERN POST — on the street ═══ */}
        <g transform="translate(360, 160) scale(0.65)">
          {/* Rays */}
          <motion.g animate={{ opacity: [0.1, 0.35, 0.1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return <line key={angle} x1="60" y1="55" x2={60 + Math.cos(rad) * 42} y2={55 + Math.sin(rad) * 42}
                stroke="hsl(45 85% 72%)" strokeWidth="1.5" strokeLinecap="round" />;
            })}
          </motion.g>
          <path d="M54 26C50 18 52 10 60 8C68 10 70 18 66 26" stroke="hsl(93 33% 25%)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M42 28H78C80 28 80 32 78 34H42C40 34 40 28 42 28Z" fill="hsl(93 33% 25%)" />
          <rect x="40" y="34" width="40" height="48" rx="10" fill="hsl(40 33% 93%)" stroke="hsl(93 33% 25%)" strokeWidth="2.5" />
          <motion.ellipse cx="60" cy="56" rx="11" ry="14" fill="hsl(45 90% 70%)" opacity="0.3"
            animate={{ ry: [14, 17, 14], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.ellipse cx="60" cy="57" rx="6" ry="9" fill="hsl(42 95% 80%)" opacity="0.55"
            animate={{ ry: [9, 11, 9] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
          <motion.path d="M60 46C57 52 57 60 60 66C63 60 63 52 60 46Z" fill="hsl(40 100% 92%)" opacity="0.85"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
          <path d="M42 82H78C80 82 80 88 78 88H42C40 88 40 82 42 82Z" fill="hsl(93 33% 25%)" />
          <path d="M52 88L50 220C50 224 54 226 60 226C66 226 70 224 70 220L68 88" fill="hsl(93 33% 25%)" />
          <rect x="47" y="98" width="26" height="5" rx="2.5" fill="hsl(93 33% 25%)" />
          <rect x="48" y="145" width="24" height="4" rx="2" fill="hsl(93 33% 25%)" />
          <ellipse cx="60" cy="228" rx="28" ry="7" fill="hsl(93 33% 25%)" />
        </g>

        {/* ═══ Lantern warm glow on ground ═══ */}
        <motion.ellipse
          cx="400" cy="350"
          rx="70" ry="15"
          fill="hsl(45 90% 70%)"
          opacity="0.08"
          animate={{ opacity: [0.06, 0.12, 0.06], rx: [70, 80, 70] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ═══ CHAT BUBBLE DOORWAY ═══ */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Bubble shadow */}
          <ellipse cx="195" cy="345" rx="80" ry="8" fill="hsl(93 33% 18%)" opacity="0.06" />

          {/* Main bubble shape — large rounded rectangle with tail */}
          <rect x="115" y="120" width="160" height="210" rx="24" fill="hsl(40 33% 96%)"
            stroke="hsl(93 33% 25%)" strokeWidth="2.5" />
          {/* Bubble tail */}
          <path d="M145 330L130 355L165 330" fill="hsl(40 33% 96%)" />
          <path d="M145 328L130 355" stroke="hsl(93 33% 25%)" strokeWidth="2.5" fill="none" />
          <path d="M130 355L165 328" stroke="hsl(93 33% 25%)" strokeWidth="2.5" fill="none" />
          {/* Cover the stroke inside the bubble */}
          <rect x="140" y="318" width="30" height="14" fill="hsl(40 33% 96%)" />

          {/* Chat lines inside bubble */}
          {/* "User" message bubble */}
          <rect x="135" y="140" width="105" height="24" rx="10" fill="hsl(21 78% 57%)" opacity="0.15" />
          <rect x="141" y="148" width="60" height="4" rx="2" fill="hsl(21 78% 57%)" opacity="0.5" />
          <rect x="141" y="155" width="35" height="3" rx="1.5" fill="hsl(21 78% 57%)" opacity="0.3" />

          {/* "Bot" response bubble */}
          <rect x="150" y="175" width="110" height="28" rx="10" fill="hsl(107 18% 52%)" opacity="0.12" />
          <rect x="158" y="183" width="70" height="4" rx="2" fill="hsl(107 18% 52%)" opacity="0.45" />
          <rect x="158" y="190" width="45" height="3" rx="1.5" fill="hsl(107 18% 52%)" opacity="0.3" />

          {/* Second "User" message */}
          <rect x="135" y="215" width="90" height="22" rx="10" fill="hsl(21 78% 57%)" opacity="0.12" />
          <rect x="141" y="222" width="50" height="4" rx="2" fill="hsl(21 78% 57%)" opacity="0.4" />

          {/* Bot response with a glow — the "recommendation" */}
          <rect x="145" y="248" width="118" height="32" rx="12" fill="hsl(45 90% 70%)" opacity="0.2" />
          <rect x="145" y="248" width="118" height="32" rx="12" fill="none" stroke="hsl(21 78% 57%)" strokeWidth="1.5" opacity="0.4" />
          <rect x="155" y="257" width="75" height="4" rx="2" fill="hsl(21 78% 57%)" opacity="0.6" />
          <rect x="155" y="264" width="50" height="3" rx="1.5" fill="hsl(21 78% 57%)" opacity="0.4" />
          {/* Star accent */}
          <g transform="translate(248, 255)">
            <path d="M5 0L6.2 3.5H10L7 5.8L8 9.5L5 7L2 9.5L3 5.8L0 3.5H3.8L5 0Z" fill="hsl(45 85% 55%)" opacity="0.7" />
          </g>

          {/* Doorway opening — an arch cut through the bottom of the bubble */}
          <path
            d="M170 340 L170 295 C170 278 182 268 195 268 C208 268 220 278 220 295 L220 340"
            fill="hsl(40 25% 88%)"
            stroke="hsl(93 33% 25%)"
            strokeWidth="2"
          />
          {/* Doorway glow */}
          <motion.path
            d="M172 340 L172 296 C172 280 183 270 195 270 C207 270 218 280 218 296 L218 340"
            fill="hsl(45 90% 70%)"
            opacity="0.08"
            animate={{ opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* ═══ PERSON STEPPING THROUGH ═══ */}
        <motion.g
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          {/* Person — mid-stride, stepping out of the doorway to the right */}
          <g transform="translate(200, 280)">
            {/* Shadow */}
            <ellipse cx="18" cy="62" rx="16" ry="4" fill="hsl(93 33% 18%)" opacity="0.08" />
            {/* Back leg (still in doorway) */}
            <path d="M12 36L6 58" stroke="hsl(21 78% 50%)" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="5" cy="60" rx="5" ry="3" fill="hsl(21 78% 50%)" />
            {/* Body */}
            <path d="M8 14C8 8 12 4 18 4C24 4 28 8 28 14L30 36C30 40 24 42 18 42C12 42 6 40 6 36L8 14Z"
              fill="hsl(21 78% 57%)" />
            {/* Head */}
            <circle cx="18" cy="-4" r="11" fill="hsl(21 78% 57%)" />
            {/* Happy face */}
            <circle cx="14" cy="-6" r="1.5" fill="hsl(40 33% 96%)" />
            <circle cx="22" cy="-6" r="1.5" fill="hsl(40 33% 96%)" />
            <path d="M13 0C15 3 21 3 23 0" stroke="hsl(40 33% 96%)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Front leg (stepping forward) */}
            <path d="M22 36L32 56" stroke="hsl(21 78% 50%)" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="33" cy="58" rx="5" ry="3" fill="hsl(21 78% 50%)" />
            {/* Leading arm (forward, welcoming) */}
            <path d="M26 18C32 14 38 10 42 6" stroke="hsl(21 78% 50%)" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        </motion.g>

        {/* ═══ Small people further down the street ═══ */}
        {/* Person walking toward lantern */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <g transform="translate(310, 310)">
            <circle cx="8" cy="4" r="6" fill="hsl(107 18% 52%)" />
            <path d="M3 14C3 10 5 8 8 8C11 8 13 10 13 14L14 28C14 30 11 31 8 31C5 31 2 30 2 28L3 14Z" fill="hsl(107 18% 52%)" />
          </g>
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <g transform="translate(340, 315)">
            <circle cx="6" cy="3" r="5" fill="hsl(93 33% 25%)" />
            <path d="M2 11C2 8 4 6 6 6C8 6 10 8 10 11L11 22C11 24 9 25 6 25C3 25 1 24 1 22L2 11Z" fill="hsl(93 33% 25%)" />
          </g>
        </motion.g>

        {/* ═══ Greenery accents ═══ */}
        {/* Bush left */}
        <ellipse cx="40" cy="340" rx="30" ry="15" fill="hsl(107 18% 52%)" opacity="0.25" />
        <ellipse cx="55" cy="336" rx="20" ry="12" fill="hsl(107 18% 52%)" opacity="0.2" />
        {/* Bush right */}
        <ellipse cx="470" cy="342" rx="25" ry="12" fill="hsl(107 18% 52%)" opacity="0.2" />

        {/* Tiny flowers on ground */}
        {[
          { cx: 90, cy: 348, c: "hsl(21 78% 67%)" },
          { cx: 290, cy: 350, c: "hsl(45 85% 65%)" },
          { cx: 450, cy: 346, c: "hsl(21 78% 62%)" },
        ].map((f, i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => {
              const rad = (a * Math.PI) / 180;
              return <circle key={a} cx={f.cx + Math.cos(rad) * 3} cy={f.cy + Math.sin(rad) * 3} r="1.8" fill={f.c} opacity="0.45" />;
            })}
            <circle cx={f.cx} cy={f.cy} r="1.3" fill="hsl(45 90% 70%)" opacity="0.5" />
          </g>
        ))}
      </svg>

      {/* ── Sparkle particles near the doorway ── */}
      {[
        { x: "42%", y: "60%", d: 0 },
        { x: "48%", y: "55%", d: 0.7 },
        { x: "44%", y: "68%", d: 1.3 },
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
