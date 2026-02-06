import LanternLogo from "./LanternLogo";

const Footer = () => (
  <footer className="bg-lantern-deep text-primary-foreground/70 px-6 md:px-12 py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5 text-primary-foreground">
        <LanternLogo className="h-6 w-auto" />
        <span className="font-display text-lg">Lantern</span>
      </div>

      <div className="flex gap-6 text-sm">
        <a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a>
        <a href="#businesses" className="hover:text-primary-foreground transition-colors">For Businesses</a>
        <a href="#team" className="hover:text-primary-foreground transition-colors">Team</a>
      </div>

      <p className="text-xs">© {new Date().getFullYear()} Lantern. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
