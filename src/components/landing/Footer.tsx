import LanternLogo from "./LanternLogo";

const Footer = () => (
  <footer className="bg-lantern-sage-dark text-lantern-cream px-6 md:px-12 py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5 text-lantern-cream">
        <LanternLogo className="h-6 w-auto" />
        <span className="font-display text-lg">Lantern</span>
      </div>

      <div className="flex gap-6 text-sm text-lantern-cream/70">
        <a href="#how-it-works" className="hover:text-lantern-cream transition-colors">How It Works</a>
        <a href="#businesses" className="hover:text-lantern-cream transition-colors">For Businesses</a>
        <a href="#team" className="hover:text-lantern-cream transition-colors">Team</a>
      </div>

      <p className="text-xs text-lantern-cream/50">© {new Date().getFullYear()} Lantern. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
