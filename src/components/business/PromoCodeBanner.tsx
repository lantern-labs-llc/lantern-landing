"use client";

import { useState } from "react";
import { Copy, Check, Tag } from "lucide-react";
import { PromoCode } from "@/lib/types/business";

export default function PromoCodeBanner({ promo }: { promo: PromoCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-wr-border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-wr-copper/10 flex items-center justify-center shrink-0">
          <Tag size={18} className="text-wr-copper" />
        </div>
        <div>
          <p className="text-sm font-medium text-wr-text">{promo.description}</p>
          <p className="text-xs text-wr-text-muted">Use code at checkout</p>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 bg-wr-copper text-white font-mono font-semibold text-base px-5 py-2.5 rounded-lg hover:bg-wr-copper-dark transition-colors"
      >
        {promo.code}
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
    </div>
  );
}
