import { PromoCode } from "@/lib/types/business";

export default function PerkCard({ promo }: { promo: PromoCode }) {
  return (
    <div className="bg-wr-cream-deep border border-wr-border rounded-[3px] py-7 px-7 text-center max-w-[380px] mx-auto mb-8">
      <div className="text-[0.72rem] uppercase tracking-[0.15em] text-wr-text-muted mb-2">
        Your first-visit code
      </div>
      <div className="font-wr-body font-medium text-[1.75rem] tracking-[0.15em] text-wr-copper-dark mb-1.5">
        {promo.code}
      </div>
      <div className="text-[0.85rem] text-wr-text-muted">
        Enter at checkout · Valid for any service · 30 days
      </div>
    </div>
  );
}
