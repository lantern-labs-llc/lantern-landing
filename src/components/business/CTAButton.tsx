export default function CTAButton({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-wr-body font-normal text-[0.9rem] tracking-[0.08em] uppercase no-underline py-[0.9rem] px-8 rounded-[2px] cursor-pointer transition-all duration-200";
  const styles =
    variant === "secondary"
      ? `${base} bg-transparent text-wr-copper-dark border border-wr-copper-light hover:bg-wr-copper-glow hover:border-wr-copper`
      : `${base} bg-wr-copper text-white border border-transparent hover:bg-wr-copper-dark`;

  return (
    <a href={href} className={styles}>
      {children}
    </a>
  );
}
