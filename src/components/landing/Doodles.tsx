/**
 * Charming Main Street doodles: lantern streetlights, storefronts, cobblestone, signs, windows.
 * Painted with thick, flowy brush strokes. Parent must have `relative overflow-hidden`.
 */

import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
  color?: string;
}

/* ── Lantern Post – tall post with glowing lantern, brushy style ── */
export const DoodleLanternPost = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 70 150" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M34 140C33 120 35 90 33 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className={color} opacity="0.9" />
    <path d="M22 140C24 139 30 138 42 140" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className={color} />
    <path d="M33 55C33 48 34 44 42 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={color} />
    <path d="M37 42C40 44 46 42 48 36C49 30 46 24 42 22C38 20 34 22 32 26C30 30 32 36 37 42Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M40 22C40 18 41 15 40 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M48 30C52 28 55 27 58 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" className={color} />
    <path d="M46 36C50 38 53 40 55 43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" className={color} />
    <path d="M34 24C30 20 27 18 24 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" className={color} />
  </svg>
);

/* ── Hanging Lantern – dangling, painterly ── */
export const DoodleHangingLantern = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 55 75" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M27 5C27 8 27 14 27 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M21 5C23 4 31 4 33 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M20 20C22 22 24 24 20 38C18 44 22 48 27 48C32 48 36 44 34 38C30 24 32 22 34 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <circle cx="27" cy="34" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" className={color} />
    <circle cx="27" cy="34" r="9" stroke="currentColor" strokeWidth="1" opacity="0.15" className={color} />
    <path d="M27 48C27 50 27 53 27 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Storefront – shop with wavy awning, brush style ── */
export const DoodleStorefront = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M12 28C12 28 14 78 14 80C50 82 60 81 96 80C97 78 98 28 98 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M8 28C20 20 40 16 55 15C70 16 90 20 102 28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className={color} />
    <path d="M8 28C16 34 24 35 32 28C40 35 48 35 56 28C64 35 72 35 80 28C88 35 96 35 102 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M44 54C44 54 44 80 44 81" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M66 54C66 54 66 80 66 81" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M44 54C48 50 62 50 66 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <circle cx="62" cy="68" r="2" fill="currentColor" opacity="0.5" className={color} />
    <path d="M18 38C18 38 18 52 18 54C22 54 32 54 36 54C36 52 36 38 36 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M74 38C74 38 74 52 74 54C78 54 88 54 92 54C92 52 92 38 92 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color} />
  </svg>
);

/* ── Cafe Shop – smaller cozy shop ── */
export const DoodleCafeShop = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 85 75" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M10 25C10 25 12 66 12 68C40 70 45 69 72 68C73 66 75 25 75 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M6 25C14 30 22 31 30 25C38 31 46 31 54 25C62 31 70 31 78 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M6 25H78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={color} />
    <path d="M16 35C16 35 16 50 16 52C20 52 32 52 36 52C36 50 36 35 36 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M26 35V52" stroke="currentColor" strokeWidth="1.2" className={color} opacity="0.5" />
    <path d="M50 45C50 45 50 68 50 69" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M66 45C66 45 66 68 66 69" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M50 45C54 42 62 42 66 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M28 12C28 12 28 25 28 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    <path d="M56 12C56 12 56 25 56 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    <path d="M28 12C32 10 52 10 56 12C56 14 56 18 56 20C52 22 32 22 28 20C28 18 28 14 28 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color} />
  </svg>
);

/* ── Hanging Sign – bracket-mounted, painterly ── */
export const DoodleHangingSign = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 65 75" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M8 5C8 5 6 6 6 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={color} />
    <path d="M8 5C8 10 8 16 15 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={color} />
    <path d="M15 20C22 20 42 20 50 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M18 20C18 22 18 28 18 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    <path d="M48 20C48 22 48 28 48 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    <path d="M14 28C14 28 14 58 14 60C18 62 48 62 52 60C52 58 52 28 52 28C48 26 18 26 14 28Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M22 40C24 40 42 40 44 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" className={color} />
    <path d="M26 48C28 48 38 48 40 48" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" className={color} />
  </svg>
);

/* ── Cobblestone Path ── */
export const DoodleCobblestone = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 170 35" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <ellipse cx="16" cy="17" rx="13" ry="7" stroke="currentColor" strokeWidth="2.5" className={color} />
    <ellipse cx="46" cy="15" rx="11" ry="8" stroke="currentColor" strokeWidth="2.5" className={color} />
    <ellipse cx="74" cy="18" rx="12" ry="6.5" stroke="currentColor" strokeWidth="2.5" className={color} />
    <ellipse cx="104" cy="16" rx="13" ry="7.5" stroke="currentColor" strokeWidth="2.5" className={color} />
    <ellipse cx="134" cy="17" rx="11" ry="7" stroke="currentColor" strokeWidth="2.5" className={color} />
    <ellipse cx="158" cy="15" rx="10" ry="8" stroke="currentColor" strokeWidth="2.5" className={color} />
  </svg>
);

/* ── Window Box – window with flower box ── */
export const DoodleWindowBox = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 65 75" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M10 6C10 6 10 42 10 44C12 44 52 44 54 44C54 42 54 6 54 6C52 4 12 4 10 6Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M32 6V44" stroke="currentColor" strokeWidth="1.8" className={color} opacity="0.6" />
    <path d="M10 25H54" stroke="currentColor" strokeWidth="1.8" className={color} opacity="0.6" />
    <path d="M8 44C8 44 8 56 8 58C10 58 54 58 56 58C56 56 56 44 56 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <circle cx="20" cy="40" r="5" stroke="currentColor" strokeWidth="2" opacity="0.5" className={color} />
    <circle cx="32" cy="38" r="5.5" stroke="currentColor" strokeWidth="2" opacity="0.5" className={color} />
    <circle cx="44" cy="40" r="5" stroke="currentColor" strokeWidth="2" opacity="0.5" className={color} />
  </svg>
);

/* ── Street Lamp (simple, short) ── */
export const DoodleStreetLamp = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 45 105" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M22 98C22 75 23 55 22 38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className={color} />
    <path d="M13 98C16 97 28 97 31 98" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className={color} />
    <path d="M13 38C15 42 18 44 22 38C26 44 29 42 31 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M13 38C13 32 14 26 12 22C14 18 18 16 22 14C26 16 30 18 32 22C30 26 31 32 31 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M20 14C20 10 22 7 22 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M16 42C12 48 10 52 9 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" className={color} />
    <path d="M22 42C22 50 22 54 22 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" className={color} />
    <path d="M28 42C32 48 34 52 35 56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" className={color} />
  </svg>
);

/* ── Town Row – row of tiny building silhouettes ── */
export const DoodleTownRow = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 220 55" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M5 48C5 24 5 22 5 22C8 20 22 20 25 22C25 22 25 48 25 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M25 48C25 18 25 16 25 16C28 14 42 14 45 16C45 16 45 48 45 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M45 48C45 24 45 22 55 12C65 22 65 24 65 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M65 48C65 20 65 18 65 18C68 16 82 16 85 18C85 18 85 48 85 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M85 48C85 28 85 26 85 26C88 24 102 24 105 26C105 26 105 48 105 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M105 48C105 18 115 8 125 18C125 18 125 48 125 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M125 48C125 22 125 20 125 20C128 18 142 18 145 20C145 20 145 48 145 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M145 48C145 26 145 24 145 24C148 22 162 22 165 24C165 24 165 48 165 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M165 48C165 20 165 18 165 18C168 16 182 16 185 18C185 18 185 48 185 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M0 48C0 48 220 48 220 48" stroke="currentColor" strokeWidth="2" className={color} />
  </svg>
);

/* ── Section Connector – a flowy brush stroke that transitions between two colors ── */
export const DoodleSectionBridge = ({ className, colorFrom = "text-primary", colorTo = "text-accent" }: DoodleProps & { colorFrom?: string; colorTo?: string }) => (
  <svg viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
    className={cn("absolute pointer-events-none", className)}>
    <defs>
      <linearGradient id="bridgeGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" className={colorFrom} />
        <stop offset="100%" stopColor="currentColor" className={colorTo} />
      </linearGradient>
    </defs>
    <path d="M-10 65C40 30 80 55 140 25C200 -5 250 50 320 20C370 0 390 35 410 15" stroke="url(#bridgeGrad)" strokeWidth="3" strokeLinecap="round" />
    <path d="M-10 70C50 45 90 60 150 40C210 20 260 55 330 35C380 20 395 45 410 30" stroke="url(#bridgeGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
  </svg>
);
