"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Business } from "@/lib/types/business";

export default function BusinessHeader({ business }: { business: Business }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-wr-cream/95 backdrop-blur-md border-b border-wr-border">
      <div className="max-w-[740px] mx-auto px-5 flex items-center justify-between h-14">
        <a href={`/b/${business.slug}`} className="font-wr-heading text-xl text-wr-text tracking-tight">
          {business.name}
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href={`/b/${business.slug}#services`} className="text-sm text-wr-text-light hover:text-wr-text transition-colors">
            Services
          </a>
          <a href={`/b/${business.slug}#hours`} className="text-sm text-wr-text-light hover:text-wr-text transition-colors">
            Hours &amp; Location
          </a>
          <a
            href={business.bookingUrl ?? `tel:${business.phone}`}
            className="inline-flex items-center gap-2 bg-wr-copper text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-wr-copper-dark transition-colors"
          >
            <Phone size={14} />
            Book Now
          </a>
        </div>

        <button className="md:hidden text-wr-text" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-wr-border bg-wr-cream px-5 py-4 flex flex-col gap-3">
          <a href={`/b/${business.slug}#services`} className="text-sm text-wr-text-light" onClick={() => setMobileOpen(false)}>
            Services
          </a>
          <a href={`/b/${business.slug}#hours`} className="text-sm text-wr-text-light" onClick={() => setMobileOpen(false)}>
            Hours &amp; Location
          </a>
          <a
            href={business.bookingUrl ?? `tel:${business.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-wr-copper text-white text-sm font-medium px-4 py-2 rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            <Phone size={14} />
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}
