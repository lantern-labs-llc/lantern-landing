"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Business } from "@/lib/types/business";

interface BusinessLandingClientProps {
  business: Business;
}

export default function BusinessLandingClient({ business }: BusinessLandingClientProps) {
  const [couponCopied, setCouponCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeReview, setActiveReview] = useState(0);

  const reviews = business.lpReviews || business.reviews || [];
  const trustItems = business.lpTrustItems || [];
  const serviceCards = business.lpServiceCards || [];
  const bookingSteps = business.lpBookingSteps || [];
  const practitioner = business.practitioner;
  const promo = business.promoCode;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const copyCoupon = useCallback(() => {
    if (promo) navigator.clipboard?.writeText(promo.code);
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  }, [promo]);

  const addRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };
  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="font-wr-body bg-white text-wr-text min-h-screen overflow-x-hidden">
      {/* Top accent bar */}
      {promo && (
        <div className="bg-wr-cream border-b border-wr-border py-2.5 px-6 flex justify-center items-center gap-2 text-xs text-wr-text-muted font-normal">
          <span className="text-wr-copper">✦</span>
          <span>
            Use code <strong className="text-wr-copper font-medium">{promo.code}</strong> for {promo.description}
          </span>
        </div>
      )}

      {/* Hero */}
      <div className="py-14 pb-10 text-center bg-white">
        <div className="max-w-[620px] mx-auto px-8 max-md:px-5">
          {/* Logo placeholder */}
          <div className="mb-9">
            <div className="font-wr-heading text-[30px] font-normal tracking-[10px] text-wr-copper">
              WELL ROOM
            </div>
          </div>

          <h1 className="font-wr-heading text-[clamp(34px,5.5vw,48px)] font-light leading-[1.2] text-wr-text mb-5">
            Advanced aesthetics &{" "}
            <em className="italic text-wr-copper">whole-body wellness</em>
          </h1>

          <p className="text-base leading-[1.75] text-wr-text-body max-w-[460px] mx-auto mb-4 font-light">
            {business.heroSubtitle}
          </p>

          <p className="text-[13px] text-wr-copper mb-9 font-normal">
            {business.address} · Mon–Fri 10am–4pm · {business.parking}
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={business.bookingUrl}
              className="bg-wr-copper text-white border-none py-[15px] px-8 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center gap-2 rounded-lg transition-all duration-[250ms] hover:bg-[#B88E5F] hover:shadow-[0_4px_16px_rgba(196,154,108,0.3)] hover:-translate-y-px"
            >
              Book Online
            </a>
            <a
              href={`tel:${business.phone.replace(/[^0-9]/g, "")}`}
              className="bg-transparent text-wr-text border-[1.5px] border-wr-copper py-[13px] px-7 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center gap-2 rounded-lg transition-all duration-[250ms] hover:bg-wr-copper hover:text-white"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div
        id="trust"
        ref={addRef("trust")}
        className="flex justify-center gap-12 max-md:gap-5 py-8 px-6 border-t border-b border-wr-border bg-wr-cream flex-wrap"
      >
        {trustItems.map((item, i) => (
          <div
            key={i}
            className={`fade-up stagger-${i + 1} ${isVisible("trust") ? "visible" : ""} text-center min-w-[100px]`}
          >
            <div className="font-wr-heading text-[21px] font-medium text-wr-text mb-1">
              {item.value}
            </div>
            <div className="text-[11px] text-wr-text-muted tracking-[0.5px] uppercase font-normal">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      {promo && (
        <div
          id="coupon"
          ref={addRef("coupon")}
          className="py-12 px-8 max-md:px-5 flex justify-center"
        >
          <div
            className={`fade-up ${isVisible("coupon") ? "visible" : ""} py-7 px-10 rounded-xl text-center max-w-[420px] w-full bg-wr-cream border-[1.5px] border-dashed border-wr-border-dashed relative`}
          >
            <div className="text-[11px] tracking-[2.5px] uppercase text-wr-copper mb-3.5 font-medium">
              {promo.description}
            </div>
            <div
              onClick={copyCoupon}
              className="font-wr-heading text-[34px] font-medium text-wr-text tracking-[6px] cursor-pointer py-1 mb-2.5 select-all"
            >
              {promo.code}
            </div>
            <div className="text-xs text-wr-text-muted font-light">
              {couponCopied ? "✓ Copied!" : "Tap to copy · Enter at checkout · Valid 30 days"}
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      <div
        id="services"
        ref={addRef("services")}
        className="py-6 pb-14 px-8 max-md:px-5 max-w-[880px] mx-auto"
      >
        <div className="text-center mb-9">
          <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-2.5 font-medium">
            Services
          </div>
          <h2 className="font-wr-heading text-[clamp(26px,4vw,34px)] font-light text-wr-text">
            More than you&apos;d expect
          </h2>
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3.5">
          {serviceCards.map((s, i) => (
            <a
              key={i}
              href={s.bookingUrl}
              className={`lp-service-card fade-up stagger-${(i % 4) + 1} ${isVisible("services") ? "visible" : ""} bg-white border border-wr-border rounded-xl no-underline text-inherit block`}
            >
              <div className="p-[22px]">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="font-wr-heading text-[19px] font-medium text-wr-text">
                    {s.name}
                  </div>
                  {s.tag && (
                    <span className="text-[10px] tracking-[0.3px] uppercase text-wr-copper bg-wr-tag-bg py-[3px] px-2 rounded font-medium whitespace-nowrap border border-wr-tag-border">
                      {s.tag}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-wr-text-body leading-[1.6] mb-3.5 font-light">
                  {s.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-wr-text font-medium">{s.price}</span>
                  <span className="text-xs text-wr-copper font-medium">Book →</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href={`${business.website}/services`}
            className="text-[13px] text-wr-copper no-underline border-b border-wr-copper/30 pb-0.5"
          >
            See all services on {business.website?.replace(/^https?:\/\/(www\.)?/, "")} →
          </a>
        </div>
      </div>

      {/* About practitioner */}
      {practitioner && (
        <div
          id="about"
          ref={addRef("about")}
          className="bg-wr-cream border-t border-b border-wr-border py-14 px-8 max-md:px-5"
        >
          <div
            className={`fade-up ${isVisible("about") ? "visible" : ""} max-w-[640px] mx-auto flex gap-8 items-center flex-wrap justify-center max-md:flex-col max-md:text-center`}
          >
            {/* Photo placeholder */}
            <div className="w-[180px] h-[220px] rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-wr-border to-[#DDD2C4] flex items-center justify-center border border-wr-border">
              <div className="text-center opacity-45">
                <div className="text-[28px] mb-1">📷</div>
                <div className="text-[10px] text-wr-text-muted tracking-[0.5px]">Photo</div>
              </div>
            </div>

            <div className="flex-1 min-w-[260px]">
              <div className="text-[11px] tracking-[2px] uppercase text-wr-copper mb-2.5 font-medium">
                Your practitioner
              </div>
              <h3 className="font-wr-heading text-[22px] font-normal text-wr-text mb-1.5">
                {practitioner.fullTitle}
              </h3>
              <p className="text-xs text-wr-copper tracking-[0.5px] mb-3.5 font-medium">
                {practitioner.credentials}
              </p>
              <p className="text-sm text-wr-text-body leading-[1.75] font-light">
                {practitioner.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <div
          id="reviews"
          ref={addRef("reviews")}
          className="py-14 px-8 max-md:px-5 max-w-[580px] mx-auto text-center"
        >
          <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-7 font-medium">
            What people say
          </div>
          <div className={`fade-up ${isVisible("reviews") ? "visible" : ""} min-h-[160px]`}>
            <div className="text-wr-copper-light mb-4 tracking-[3px] text-lg">★ ★ ★ ★ ★</div>
            <p className="font-wr-heading text-[19px] font-normal leading-[1.75] text-wr-text-mid italic mb-[18px] transition-opacity duration-[400ms]">
              &ldquo;{reviews[activeReview]?.text}&rdquo;
            </p>
            <div className="text-[13px] text-wr-text-muted">
              <span className="font-medium text-wr-text-info">{reviews[activeReview]?.author}</span>
              {reviews[activeReview]?.service && ` · ${reviews[activeReview].service}`}
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-6">
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`review-dot ${i === activeReview ? "active" : ""}`}
                onClick={() => setActiveReview(i)}
              />
            ))}
          </div>
          <a
            href="https://g.co/kgs/WHegSC"
            className="inline-block mt-[18px] text-xs text-wr-text-muted no-underline border-b border-wr-text-faint pb-px"
          >
            Read all {business.reviewCount}+ reviews on Google →
          </a>
        </div>
      )}

      {/* How to book */}
      {bookingSteps.length > 0 && (
        <div
          id="steps"
          ref={addRef("steps")}
          className="py-4 pb-14 px-8 max-md:px-5 max-w-[700px] mx-auto"
        >
          <div className="text-center mb-9">
            <h2 className="font-wr-heading text-[26px] font-light text-wr-text">
              Book in 30 seconds
            </h2>
          </div>
          <div className="flex gap-8 justify-center flex-wrap">
            {bookingSteps.map((item, i) => (
              <div
                key={i}
                className={`fade-up stagger-${i + 1} ${isVisible("steps") ? "visible" : ""} flex-1 min-w-[170px] max-w-[190px] text-center`}
              >
                <div className="font-wr-heading text-[30px] font-light text-wr-copper-light mb-2.5">
                  {item.step}
                </div>
                <div className="text-sm font-medium text-wr-text mb-1.5">{item.title}</div>
                <div className="text-[13px] text-wr-text-muted leading-[1.6] font-light">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location */}
      <div
        id="location"
        ref={addRef("location")}
        className="py-4 pb-14 px-8 max-md:px-5 max-w-[700px] mx-auto"
      >
        <div className="text-center mb-7">
          <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-2.5 font-medium">
            Find us
          </div>
          <h2 className="font-wr-heading text-[26px] font-light text-wr-text">
            10th Street, Downtown Charlottesville
          </h2>
        </div>
        <div className={`fade-up ${isVisible("location") ? "visible" : ""}`}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${business.address}, ${business.city}, ${business.state} ${business.zip}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline"
          >
            <div className="rounded-xl overflow-hidden border border-wr-border">
              {/* Map placeholder */}
              <div className="h-[200px] bg-gradient-to-br from-[#F8F5F0] via-wr-border to-[#F5F1EB] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.06]">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={`h${i}`}
                      className="absolute left-0 right-0 h-px bg-wr-text-body"
                      style={{ top: `${(i + 1) * 13}%`, transform: `rotate(${i % 2 === 0 ? -1.5 : 2}deg)` }}
                    />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`v${i}`}
                      className="absolute top-0 bottom-0 w-px bg-wr-text-body"
                      style={{ left: `${(i + 1) * 16}%`, transform: `rotate(${i % 2 === 0 ? 0.5 : -0.5}deg)` }}
                    />
                  ))}
                </div>
                <div className="text-center z-[1]">
                  <div className="w-9 h-9 rounded-[50%_50%_50%_0] bg-wr-copper -rotate-45 mx-auto mb-3 shadow-[0_3px_12px_rgba(196,154,108,0.2)] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white rotate-45" />
                  </div>
                  <div className="text-[13px] font-medium text-wr-text bg-white/90 py-1.5 px-3.5 rounded-md">
                    {business.address}
                  </div>
                </div>
              </div>
              <div className="bg-white py-3.5 px-5 flex justify-between items-center flex-wrap gap-2 border-t border-wr-border">
                <div>
                  <div className="text-sm font-medium text-wr-text">{business.name}</div>
                  <div className="text-xs text-wr-text-muted mt-0.5">
                    {business.address}, {business.city}, {business.state} {business.zip}
                  </div>
                </div>
                <div className="text-xs font-medium text-wr-copper">Get directions →</div>
              </div>
            </div>
          </a>
          <div className="flex justify-center gap-6 mt-[18px] flex-wrap">
            {[
              { label: business.parking || "Free parking", icon: "P" },
              { label: "Mon–Fri 10am–4pm", icon: "◷" },
              { label: `Downtown ${business.city?.split(",")[0]}`, icon: "◉" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-wr-text-muted">
                <span className="text-wr-copper text-[13px]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-wr-cream border-t border-wr-border py-14 px-8 text-center">
        <h2 className="font-wr-heading text-[clamp(26px,4vw,34px)] font-light text-wr-text mb-2.5">
          Ready to experience {business.name}?
        </h2>
        {promo && (
          <p className="text-sm text-wr-text-muted mb-7 font-light">
            Use code <strong className="text-wr-copper font-medium">{promo.code}</strong> for {promo.description}.
          </p>
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={business.bookingUrl}
            className="bg-wr-copper text-white border-none py-[15px] px-8 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center gap-2 rounded-lg transition-all duration-[250ms] hover:bg-[#B88E5F] hover:shadow-[0_4px_16px_rgba(196,154,108,0.3)] hover:-translate-y-px"
          >
            Book Online
          </a>
          <a
            href={`tel:${business.phone.replace(/[^0-9]/g, "")}`}
            className="bg-transparent text-wr-text border-[1.5px] border-wr-copper py-[13px] px-7 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center gap-2 rounded-lg transition-all duration-[250ms] hover:bg-wr-copper hover:text-white"
          >
            Call {business.phone}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-wr-border py-7 px-8 text-center">
        <div className="flex justify-center gap-6 mb-3.5 flex-wrap">
          {business.website && (
            <a href={business.website} className="text-[13px] text-wr-text-body no-underline">
              {business.website.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          )}
          <a href="https://www.google.com/maps/place/Well+Room" className="text-[13px] text-wr-text-body no-underline">
            Directions
          </a>
          <a href={`tel:${business.phone.replace(/[^0-9]/g, "")}`} className="text-[13px] text-wr-text-body no-underline">
            {business.phone}
          </a>
        </div>
        <div className="text-[11px] text-wr-text-subtle">
          {business.address}, {business.city}, {business.state} · Mon–Fri 10am–4pm
        </div>
        <div className="text-[11px] text-wr-text-faint mt-2.5">
          Powered by <a href="https://lantern.llc" className="text-wr-text-subtle no-underline">Lantern</a>
        </div>
      </div>
    </div>
  );
}
