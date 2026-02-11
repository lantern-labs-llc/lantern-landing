import { useLocation } from "react-router-dom";
import lanternLogo from "@/assets/lantern-logo-2.png";

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const linkHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
  <footer className="bg-lantern-sage-dark text-lantern-cream px-6 md:px-12 py-16">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
      <div className="flex items-center gap-3 text-lantern-cream">
        <a href={isHome ? "#" : "/"} className="flex items-center gap-3">
          <img src={lanternLogo} alt="Lantern logo" className="h-11 w-auto" />
          <div className="flex flex-col">
            <span className="font-display text-2xl leading-tight">Lantern</span>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-lantern-cream/50">Illuminating Main Street</span>
          </div>
        </a>
      </div>

      <div className="flex gap-8 text-base text-lantern-cream/70">
        <a href={linkHref("how-it-works")} className="hover:text-lantern-cream transition-colors">How It Works</a>
        <a href={linkHref("businesses")} className="hover:text-lantern-cream transition-colors">For Businesses</a>
        <a href={linkHref("team")} className="hover:text-lantern-cream transition-colors">Team</a>
      </div>

      <p className="text-sm text-lantern-cream/50">© {new Date().getFullYear()} Lantern. All rights reserved.</p>
    </div>
  </footer>
  );
};

export default Footer;
