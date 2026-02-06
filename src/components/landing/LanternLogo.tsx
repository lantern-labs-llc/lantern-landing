const LanternLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hook */}
    <path d="M20 2C20 2 20 6 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 2H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Top cap */}
    <rect x="12" y="8" width="16" height="4" rx="2" fill="currentColor" />
    {/* Glass body */}
    <path
      d="M14 12C12 12 10 16 10 24C10 32 12 36 14 36H26C28 36 30 32 30 24C30 16 28 12 26 12H14Z"
      fill="hsl(38, 78%, 56%)"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Inner glow / flame */}
    <ellipse cx="20" cy="24" rx="5" ry="7" fill="hsl(38, 85%, 65%)" fillOpacity="0.6" />
    <ellipse cx="20" cy="23" rx="2.5" ry="4" fill="hsl(38, 78%, 56%)" fillOpacity="0.9" />
    {/* Bottom cap */}
    <rect x="12" y="36" width="16" height="4" rx="2" fill="currentColor" />
    {/* Base */}
    <path d="M15 40L14 44H26L25 40" fill="currentColor" />
    <rect x="13" y="44" width="14" height="2" rx="1" fill="currentColor" />
  </svg>
);

export default LanternLogo;
