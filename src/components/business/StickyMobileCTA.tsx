"use client";

import { useEffect, useState } from "react";

export default function StickyMobileCTA({
  bookingUrl,
  phoneNumber,
}: {
  bookingUrl: string;
  phoneNumber: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  const btnBase =
    "inline-flex items-center justify-center gap-2 font-wr-body font-normal text-[0.82rem] tracking-[0.08em] uppercase no-underline py-3 px-4 rounded-[2px] cursor-pointer transition-all duration-200 flex-1";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-wr-white border-t border-wr-border py-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] min-[601px]:hidden">
      <div className="flex gap-3">
        <a
          href={bookingUrl}
          className={`${btnBase} bg-wr-copper text-white border border-transparent hover:bg-wr-copper-dark justify-center`}
        >
          Book Now →
        </a>
        <a
          href={`tel:${phoneNumber}`}
          className={`${btnBase} bg-transparent text-wr-copper-dark border border-wr-copper-light hover:bg-wr-copper-glow hover:border-wr-copper justify-center`}
        >
          Call
        </a>
      </div>
    </div>
  );
}
