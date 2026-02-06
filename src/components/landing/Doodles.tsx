/**
 * Abstract, flowy SVG accent doodles themed around light, magnetism & attraction.
 * All positioned absolutely — parent must have `relative overflow-hidden`.
 */

import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
  color?: string;
}

/* ── Light Ray – a soft curved beam ── */
export const DoodleLightRay = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M5 70C20 55 40 15 60 20C80 25 85 60 115 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M10 75C25 60 45 25 65 30C85 35 90 65 118 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" className={color} />
  </svg>
);

/* ── Glow Orb – radiating soft circles ── */
export const DoodleGlowOrb = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <circle cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="1.5" className={color} />
    <circle cx="30" cy="30" r="14" stroke="currentColor" strokeWidth="1" opacity="0.6" className={color} />
    <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="0.7" opacity="0.3" className={color} />
    <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="0.5" opacity="0.15" className={color} />
  </svg>
);

/* ── Magnetic Arc – curved attraction field line ── */
export const DoodleMagneticArc = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M10 55C10 25 30 5 50 5C70 5 90 25 90 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M20 55C20 32 33 12 50 12C67 12 80 32 80 55" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" className={color} />
    <path d="M30 55C30 38 38 22 50 22C62 22 70 38 70 55" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" className={color} />
  </svg>
);

/* ── Sparkle – small twinkle ── */
export const DoodleSparkle = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" className={color} />
  </svg>
);

/* ── Flow Line – gentle S-curve ── */
export const DoodleFlowLine = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M0 30C25 30 25 10 50 10C75 10 75 30 100 30C125 30 125 10 140 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Orbit – elliptical path with dot ── */
export const DoodleOrbit = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <ellipse cx="40" cy="25" rx="35" ry="18" stroke="currentColor" strokeWidth="1" className={color} />
    <circle cx="72" cy="18" r="3" fill="currentColor" opacity="0.6" className={color} />
  </svg>
);

/* ── Beam Burst – radiating lines from a point ── */
export const DoodleBeamBurst = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <line x1="30" y1="30" x2="30" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className={color} />
    <line x1="30" y1="30" x2="50" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" className={color} />
    <line x1="30" y1="30" x2="55" y2="25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" className={color} />
    <line x1="30" y1="30" x2="10" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" className={color} />
    <line x1="30" y1="30" x2="5" y2="25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" className={color} />
    <line x1="30" y1="30" x2="18" y2="6" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" className={color} />
    <line x1="30" y1="30" x2="42" y2="6" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" className={color} />
    <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" className={color} />
  </svg>
);

/* ── Ripple – concentric half-circles ── */
export const DoodleRipple = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M25 38A15 15 0 0 1 55 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={color} />
    <path d="M15 38A25 25 0 0 1 65 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" className={color} />
    <path d="M5 38A35 35 0 0 1 75 38" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" className={color} />
  </svg>
);

/* ── Swirl – spiral attraction curve ── */
export const DoodleSwirl = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M30 15C38 15 42 22 42 30C42 38 36 42 30 42C24 42 20 38 20 32C20 26 24 23 28 23C32 23 34 26 34 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={color} />
  </svg>
);

/* ── Field Lines – magnetic field flowing between two poles ── */
export const DoodleFieldLines = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute pointer-events-none", className)}>
    <circle cx="20" cy="50" r="4" fill="currentColor" opacity="0.4" className={color} />
    <circle cx="80" cy="50" r="4" fill="currentColor" opacity="0.4" className={color} />
    <path d="M24 50C35 30 65 30 76 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" className={color} />
    <path d="M24 50C35 20 65 20 76 50" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" className={color} />
    <path d="M24 50C35 70 65 70 76 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" className={color} />
    <path d="M24 50C35 80 65 80 76 50" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" className={color} />
  </svg>
);

/* ── Connector Wave – meant to sit between sections ── */
export const DoodleConnectorWave = ({ className, color = "text-primary" }: DoodleProps) => (
  <svg viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
    className={cn("absolute pointer-events-none", className)}>
    <path d="M0 15C50 5 80 25 130 15C180 5 210 25 260 15C310 5 340 25 400 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className={color} />
  </svg>
);
