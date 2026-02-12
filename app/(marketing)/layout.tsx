import PasswordGate from "@/components/PasswordGate";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <PasswordGate>{children}</PasswordGate>;
}
