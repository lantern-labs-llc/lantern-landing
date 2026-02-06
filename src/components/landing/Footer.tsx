import lanternLogo from "@/assets/lantern-logo-2.png";

const Footer = () => (
  <footer className="bg-lantern-sage-dark text-lantern-cream px-6 md:px-12 py-16">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-lantern-cream">
          <img src={lanternLogo} alt="Lantern logo" className="h-11 w-auto" />
          <span className="font-display text-2xl">Lantern</span>
        </div>
        <p className="text-sm italic text-lantern-cream/60 ml-14">Illuminating Main Street</p>
      </div>

      <div className="flex gap-8 text-base text-lantern-cream/70">
        <a href="#how-it-works" className="hover:text-lantern-cream transition-colors">How It Works</a>
        <a href="#businesses" className="hover:text-lantern-cream transition-colors">For Businesses</a>
        <a href="#team" className="hover:text-lantern-cream transition-colors">Team</a>
      </div>

      <p className="text-sm text-lantern-cream/50">© {new Date().getFullYear()} Lantern. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
