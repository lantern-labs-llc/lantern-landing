/**
 * Hand-drawn style SVG doodles: lantern streetlights, storefronts, cobblestone, awnings, hanging signs.
 * All positioned absolutely — parent must have `relative overflow-hidden`.
 */

import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
  color?: string;
}

/* ── Lantern Streetlight – tall post with glowing lantern ── */
export const DoodleLanternPost = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Post */}
    <path d="M30 135V50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    {/* Base */}
    <path d="M20 135H40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    <path d="M24 131H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    {/* Arm */}
    <path d="M30 50C30 50 30 42 38 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    {/* Lantern body */}
    <path d="M33 38L43 38L45 28L41 22L35 22L31 28L33 38Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={color} />
    {/* Lantern top */}
    <path d="M36 22V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M38 22V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    {/* Glow rays */}
    <path d="M38 30L48 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className={color} />
    <path d="M38 32L47 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className={color} />
    <path d="M34 28L26 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className={color} />
  </svg>
);

/* ── Hanging Lantern – no post, just a dangling lantern ── */
export const DoodleHangingLantern = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Chain/hook */}
    <path d="M25 5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M22 5H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    {/* Lantern body */}
    <path d="M18 18H32L35 35L30 45H20L15 35L18 18Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={color} />
    {/* Glass panes */}
    <line x1="22" y1="20" x2="20" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className={color} />
    <line x1="28" y1="20" x2="30" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className={color} />
    {/* Glow */}
    <circle cx="25" cy="32" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.35" className={color} />
    <circle cx="25" cy="32" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.15" className={color} />
    {/* Bottom finial */}
    <path d="M25 45V50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Storefront – small shop with awning and door ── */
export const DoodleStorefront = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Building */}
    <rect x="10" y="25" width="80" height="50" rx="2" stroke="currentColor" strokeWidth="1.8" className={color} />
    {/* Awning */}
    <path d="M6 25L50 18L94 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color} />
    <path d="M6 25C14 32 22 32 30 25C38 32 46 32 54 25C62 32 70 32 78 25C86 32 94 32 94 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    {/* Door */}
    <rect x="40" y="48" width="20" height="27" rx="1" stroke="currentColor" strokeWidth="1.5" className={color} />
    <circle cx="56" cy="62" r="1.5" fill="currentColor" opacity="0.6" className={color} />
    {/* Windows */}
    <rect x="16" y="35" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" className={color} />
    <rect x="68" y="35" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" className={color} />
    <line x1="24" y1="35" x2="24" y2="49" stroke="currentColor" strokeWidth="0.8" className={color} />
    <line x1="76" y1="35" x2="76" y2="49" stroke="currentColor" strokeWidth="0.8" className={color} />
  </svg>
);

/* ── Cafe Storefront – variation with a smaller feel ── */
export const DoodleCafeShop = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Building */}
    <rect x="8" y="22" width="64" height="42" rx="2" stroke="currentColor" strokeWidth="1.8" className={color} />
    {/* Awning – straight scallops */}
    <path d="M5 22H75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    <path d="M5 22C11 28 17 28 23 22C29 28 35 28 41 22C47 28 53 28 59 22C65 28 71 28 75 22" stroke="currentColor" strokeWidth="1.5" className={color} />
    {/* Window */}
    <rect x="14" y="32" width="22" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" className={color} />
    <line x1="25" y1="32" x2="25" y2="48" stroke="currentColor" strokeWidth="0.8" className={color} />
    {/* Door */}
    <rect x="46" y="40" width="18" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" className={color} />
    <circle cx="60" cy="52" r="1.2" fill="currentColor" opacity="0.6" className={color} />
    {/* Sign */}
    <rect x="26" y="12" width="28" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" className={color} />
    <line x1="32" y1="17" x2="48" y2="17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className={color} />
  </svg>
);

/* ── Hanging Sign – bracket-mounted shop sign ── */
export const DoodleHangingSign = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Bracket */}
    <path d="M8 5V15C8 15 8 20 15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    <path d="M8 5H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    {/* Chains */}
    <line x1="18" y1="20" x2="18" y2="28" stroke="currentColor" strokeWidth="1.2" className={color} />
    <line x1="48" y1="20" x2="48" y2="28" stroke="currentColor" strokeWidth="1.2" className={color} />
    <path d="M15 20H50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    {/* Sign board */}
    <rect x="12" y="28" width="42" height="28" rx="3" stroke="currentColor" strokeWidth="1.8" className={color} />
    {/* Text lines */}
    <line x1="20" y1="38" x2="46" y2="38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" className={color} />
    <line x1="24" y1="45" x2="42" y2="45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" className={color} />
  </svg>
);

/* ── Cobblestone Path – short wavy path ── */
export const DoodleCobblestone = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 160 30" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Row of cobblestones */}
    <ellipse cx="15" cy="15" rx="12" ry="6" stroke="currentColor" strokeWidth="1.2" className={color} />
    <ellipse cx="42" cy="13" rx="10" ry="7" stroke="currentColor" strokeWidth="1.2" className={color} />
    <ellipse cx="66" cy="16" rx="11" ry="5.5" stroke="currentColor" strokeWidth="1.2" className={color} />
    <ellipse cx="92" cy="14" rx="12" ry="6.5" stroke="currentColor" strokeWidth="1.2" className={color} />
    <ellipse cx="118" cy="15" rx="10" ry="6" stroke="currentColor" strokeWidth="1.2" className={color} />
    <ellipse cx="144" cy="13" rx="11" ry="7" stroke="currentColor" strokeWidth="1.2" className={color} />
  </svg>
);

/* ── Window Box – window with flower box ── */
export const DoodleWindowBox = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Window frame */}
    <rect x="8" y="5" width="44" height="38" rx="2" stroke="currentColor" strokeWidth="1.8" className={color} />
    <line x1="30" y1="5" x2="30" y2="43" stroke="currentColor" strokeWidth="1" className={color} />
    <line x1="8" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="1" className={color} />
    {/* Flower box */}
    <rect x="6" y="43" width="48" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" className={color} />
    {/* Flowers */}
    <circle cx="18" cy="40" r="4" stroke="currentColor" strokeWidth="1" opacity="0.6" className={color} />
    <circle cx="30" cy="38" r="4.5" stroke="currentColor" strokeWidth="1" opacity="0.6" className={color} />
    <circle cx="42" cy="40" r="4" stroke="currentColor" strokeWidth="1" opacity="0.6" className={color} />
    {/* Stems */}
    <line x1="18" y1="44" x2="18" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className={color} />
    <line x1="30" y1="42" x2="30" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className={color} />
    <line x1="42" y1="44" x2="42" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className={color} />
  </svg>
);

/* ── Street Lamp (simple) – shorter, simpler lamp ── */
export const DoodleStreetLamp = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Pole */}
    <line x1="20" y1="95" x2="20" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={color} />
    {/* Base */}
    <path d="M12 95H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={color} />
    {/* Lamp head */}
    <path d="M12 35H28L30 25H10L12 35Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={color} />
    {/* Top */}
    <path d="M18 25L20 18L22 25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    {/* Glow */}
    <path d="M15 35L10 45" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" className={color} />
    <path d="M20 35V47" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" className={color} />
    <path d="M25 35L30 45" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" className={color} />
  </svg>
);

/* ── Town Row – row of tiny buildings silhouette ── */
export const DoodleTownRow = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    {/* Building silhouettes */}
    <path d="M5 45V20H25V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M25 45V15H45V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M45 45V22L55 12L65 22V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M65 45V18H85V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M85 45V25H105V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M105 45V14L115 8L125 14V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M125 45V20H145V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M145 45V24H165V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    <path d="M165 45V16H185V45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={color} />
    {/* Tiny windows */}
    <rect x="11" y="28" width="4" height="4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" className={color} />
    <rect x="31" y="22" width="4" height="4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" className={color} />
    <rect x="71" y="26" width="4" height="4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" className={color} />
    <rect x="111" y="20" width="4" height="4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" className={color} />
    <rect x="151" y="30" width="4" height="4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" className={color} />
    {/* Ground line */}
    <line x1="0" y1="45" x2="200" y2="45" stroke="currentColor" strokeWidth="1" className={color} />
  </svg>
);
