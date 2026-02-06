/**
 * Subtle illustrated SVG accent doodles for background decoration.
 * All positioned absolutely — parent must have `relative overflow-hidden`.
 * Uses brand palette colors at very low opacity for a tonal feel.
 */

import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
  color?: string; // tailwind text-color class
}

/* ── Storefront ── */
export const DoodleStorefront = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <rect x="15" y="35" width="50" height="35" rx="2" stroke="currentColor" strokeWidth="1.5" className={color} />
    <path d="M10 35L40 12L70 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <rect x="32" y="50" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" className={color} />
    <rect x="20" y="42" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" className={color} />
    <rect x="50" y="42" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" className={color} />
  </svg>
);

/* ── Chat Bubble ── */
export const DoodleChatBubble = ({ className, color = "text-secondary" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path
      d="M10 12C10 9.79 11.79 8 14 8H50C52.21 8 54 9.79 54 12V36C54 38.21 52.21 40 50 40H22L14 50V40H14C11.79 40 10 38.21 10 36V12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      className={color}
    />
    <circle cx="24" cy="24" r="2" fill="currentColor" className={color} />
    <circle cx="32" cy="24" r="2" fill="currentColor" className={color} />
    <circle cx="40" cy="24" r="2" fill="currentColor" className={color} />
  </svg>
);

/* ── Map Pin ── */
export const DoodleMapPin = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 48 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path
      d="M24 4C14.06 4 6 12.06 6 22C6 36 24 58 24 58S42 36 42 22C42 12.06 33.94 4 24 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      className={color}
    />
    <circle cx="24" cy="22" r="7" stroke="currentColor" strokeWidth="1.5" className={color} />
  </svg>
);

/* ── Coffee Cup ── */
export const DoodleCoffee = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path d="M12 24H44V50C44 54.42 40.42 58 36 58H20C15.58 58 12 54.42 12 50V24Z" stroke="currentColor" strokeWidth="1.5" className={color} />
    <path d="M44 28H50C53.31 28 56 30.69 56 34V36C56 39.31 53.31 42 50 42H44" stroke="currentColor" strokeWidth="1.5" className={color} />
    <path d="M22 16C22 12 26 12 26 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M30 16C30 12 34 12 34 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Star / Sparkle ── */
export const DoodleStar = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path
      d="M20 4L23.5 15.5H35L25.5 22.5L29 34L20 27L11 34L14.5 22.5L5 15.5H16.5L20 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className={color}
    />
  </svg>
);

/* ── Lightbulb ── */
export const DoodleLightbulb = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 48 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path
      d="M24 6C15.16 6 8 13.16 8 22C8 28.4 12 33.8 17.6 36.4V44H30.4V36.4C36 33.8 40 28.4 40 22C40 13.16 32.84 6 24 6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      className={color}
    />
    <line x1="18" y1="48" x2="30" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <line x1="18" y1="52" x2="30" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <line x1="21" y1="56" x2="27" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Heart ── */
export const DoodleHeart = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path
      d="M24 42S4 28 4 16C4 9.37 9.37 4 16 4C20.02 4 23.44 6.18 24 6.78C24.56 6.18 27.98 4 32 4C38.63 4 44 9.37 44 16C44 28 24 42 24 42Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className={color}
    />
  </svg>
);

/* ── Envelope ── */
export const DoodleEnvelope = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <rect x="4" y="6" width="56" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" className={color} />
    <path d="M4 9L32 28L60 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
  </svg>
);

/* ── Coins ── */
export const DoodleCoins = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <ellipse cx="26" cy="36" rx="20" ry="12" stroke="currentColor" strokeWidth="1.5" className={color} />
    <ellipse cx="26" cy="30" rx="20" ry="12" stroke="currentColor" strokeWidth="1.5" className={color} />
    <ellipse cx="38" cy="22" rx="20" ry="12" stroke="currentColor" strokeWidth="1.5" className={color} />
  </svg>
);

/* ── Scissors ── */
export const DoodleScissors = ({ className, color = "text-secondary" }: DoodleProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" className={color} />
    <circle cx="14" cy="34" r="8" stroke="currentColor" strokeWidth="1.5" className={color} />
    <line x1="20" y1="18" x2="42" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <line x1="20" y1="30" x2="42" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Lantern ── */
export const DoodleLantern = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg
    viewBox="0 0 40 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}
  >
    <path d="M16 8H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M20 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M12 14H28L32 44H8L12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M14 14C14 11 16.69 8 20 8C23.31 8 26 11 26 14" stroke="currentColor" strokeWidth="1.5" className={color} />
    <line x1="14" y1="48" x2="26" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <circle cx="20" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" className={color} />
  </svg>
);
