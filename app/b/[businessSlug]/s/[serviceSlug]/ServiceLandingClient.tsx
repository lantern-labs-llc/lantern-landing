"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Business, Service } from "@/lib/types/business";
import { resolveServiceLP } from "@/lib/resolveServiceLP";

interface ServiceLandingClientProps {
  business: Business;
  service: Service;
}

export default function ServiceLandingClient({ business, service }: ServiceLandingClientProps) {
  const [couponCopied, setCouponCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeReview, setActiveReview] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const lp = resolveServiceLP(service, business);
  const reviews = lp.lpReviews;
  const faqs = lp.lpFaqs;
  const trustItems = lp.lpTrustItems;
  const expectItems = lp.lpExpectItems;
  const benefits = lp.lpBenefits;
  const pricing = lp.pricing;
  const promo = business.promoCode;
  const practitioner = business.practitioner;

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
      {/* Top bar */}
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
        <div className="max-w-[600px] mx-auto px-8 max-md:px-5">
          {/* Logo link */}
          <a href={`/b/${business.slug}`} className="no-underline block mb-9">
            <div className="font-wr-heading text-[30px] font-normal tracking-[10px] text-wr-copper">
              WELL ROOM
            </div>
          </a>

          <h1 className="font-wr-heading text-[clamp(34px,5.5vw,48px)] font-light leading-[1.2] text-wr-text mb-5">
            {service.name}
          </h1>

          <p className="text-base leading-[1.75] text-wr-text-body max-w-[440px] mx-auto mb-4 font-light">
            {service.shortDescription}
          </p>

          {service.price && (
            <p className="text-[15px] text-wr-copper mb-8 font-medium">
              {service.price} per session
            </p>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={service.bookingUrl}
              className="bg-wr-copper text-white border-none py-[15px] px-8 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center rounded-lg transition-all duration-[250ms] hover:bg-wr-copper-dark hover:shadow-[0_4px_16px_rgba(184,132,90,0.3)] hover:-translate-y-px"
            >
              Book {service.name}
            </a>
            <a
              href={`tel:${business.phone.replace(/[^0-9]/g, "")}`}
              className="bg-transparent text-wr-text border-[1.5px] border-wr-copper py-[13px] px-7 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center rounded-lg transition-all duration-[250ms] hover:bg-wr-copper hover:text-white"
            >
              Call {business.phone}
            </a>
          </div>

          {promo && (
            <p className="text-[13px] text-wr-text-muted mt-[18px] font-light flex items-center justify-center gap-1.5">
              <span className="text-wr-copper text-sm">✦</span>
              Use code{" "}
              <span
                onClick={copyCoupon}
                className="font-medium text-wr-text tracking-[1.5px] cursor-pointer border-b-[1.5px] border-dashed border-wr-border-dashed pb-px"
              >
                {promo.code}
              </span>{" "}
              for {promo.description}
              {couponCopied && <span className="text-wr-copper ml-1">· Copied!</span>}
            </p>
          )}
        </div>
      </div>

      {/* Trust bar */}
      {trustItems.length > 0 && (
        <div
          id="trust"
          ref={addRef("trust")}
          className="flex justify-center items-center gap-0 px-6 border-t border-b border-wr-border bg-wr-cream flex-wrap"
        >
          {trustItems.map((item, i, arr) => (
            <div
              key={i}
              className={`fade-up stagger-${i + 1} ${isVisible("trust") ? "visible" : ""} text-center py-5 px-7 ${i < arr.length - 1 ? "border-r border-wr-border" : ""}`}
            >
              <div className="text-sm font-medium text-wr-text mb-0.5">{item.top}</div>
              <div className="text-[11px] text-wr-text-muted font-light">{item.bottom}</div>
            </div>
          ))}
        </div>
      )}

      {/* What to expect */}
      {expectItems.length > 0 && (
        <div
          id="expect"
          ref={addRef("expect")}
          className="py-10 pb-14 px-8 max-md:px-5 max-w-[760px] mx-auto"
        >
          <div className="text-center mb-9">
            <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-2.5 font-medium">
              Your visit
            </div>
            <h2 className="font-wr-heading text-[clamp(26px,4vw,32px)] font-light text-wr-text">
              What to expect
            </h2>
          </div>

          <div className="flex gap-8 items-stretch max-md:flex-col">
            {/* Service photo */}
            <div className="w-[240px] min-h-[300px] rounded-xl overflow-hidden shrink-0 border border-wr-border max-md:w-full max-md:min-h-[200px]">
              <img
                src={`/images/services/${service.slug}.jpg`}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Expect items */}
            <div className="flex-1 flex flex-col gap-5 justify-center">
              {expectItems.map((item, i) => (
                <div
                  key={i}
                  className={`fade-up stagger-${i + 1} ${isVisible("expect") ? "visible" : ""} flex gap-3 items-start`}
                >
                  <div className="text-lg text-wr-copper shrink-0 mt-px">{item.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-wr-text mb-[3px]">{item.title}</div>
                    <div className="text-[13px] text-wr-text-body leading-[1.6] font-light">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Session pricing */}
      {pricing.length > 0 && (
        <div
          id="sessions"
          ref={addRef("sessions")}
          className="py-4 pb-14 px-8 max-md:px-5 max-w-[700px] mx-auto"
        >
          <div className="text-center mb-8">
            <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-2.5 font-medium">
              Pricing
            </div>
            <h2 className="font-wr-heading text-[clamp(26px,4vw,32px)] font-light text-wr-text">
              Choose your session
            </h2>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3.5">
            {pricing.map((p, i) => (
              <a
                key={i}
                href={service.bookingUrl}
                className={`lp-session-card fade-up stagger-${i + 1} ${isVisible("sessions") ? "visible" : ""} block no-underline text-inherit rounded-xl border ${p.featured ? "border-wr-copper bg-wr-cream-warm" : "border-wr-border bg-white"}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-1.5">
                    <div className="text-sm font-medium text-wr-text">{p.name}</div>
                    {p.tag && (
                      <span className="text-[10px] tracking-[0.3px] uppercase text-wr-copper bg-wr-tag-bg py-[3px] px-2 rounded font-medium border border-wr-tag-border">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  {p.description && (
                    <div className="text-[13px] text-wr-text-body leading-[1.6] mb-4 font-light">
                      {p.description}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-wr-heading text-2xl font-medium text-wr-text">
                      {p.price}
                    </span>
                    <span className="text-xs text-wr-copper font-medium">Book →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {business.bundlesUrl && (
            <div className="text-center mt-[18px]">
              <a
                href={business.bundlesUrl}
                className="text-[13px] text-wr-copper no-underline border-b border-wr-copper/30 pb-0.5"
              >
                Bundles &amp; multi-packs also available →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <div
          id="benefits"
          ref={addRef("benefits")}
          className="bg-wr-cream border-t border-b border-wr-border py-14 px-8"
        >
          <div className="max-w-[600px] mx-auto">
            <div className="text-center mb-9">
              <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-2.5 font-medium">
                {lp.lpBenefitLabel}
              </div>
              <h2 className="font-wr-heading text-[clamp(26px,4vw,32px)] font-light text-wr-text">
                {lp.lpBenefitSectionTitle}
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className={`fade-up stagger-${(i % 4) + 1} ${isVisible("benefits") ? "visible" : ""} flex gap-3.5 items-start`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-wr-copper shrink-0 mt-2" />
                  <div>
                    <span className="text-sm font-medium text-wr-text">{item.title}</span>
                    {item.description && (
                      <span className="text-sm text-wr-text-body font-light"> — {item.description}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <div
          id="reviews"
          ref={addRef("reviews")}
          className="py-14 px-8 max-md:px-5 max-w-[560px] mx-auto text-center"
        >
          <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-7 font-medium">
            {lp.lpReviewLabel}
          </div>
          <div className={`fade-up ${isVisible("reviews") ? "visible" : ""} min-h-[140px]`}>
            <div className="text-wr-copper-light mb-4 tracking-[3px] text-lg">★ ★ ★ ★ ★</div>
            <p className="font-wr-heading text-[19px] font-normal leading-[1.75] text-wr-text-mid italic mb-4 transition-opacity duration-[400ms]">
              &ldquo;{reviews[activeReview]?.text}&rdquo;
            </p>
            <div className="text-[13px] text-wr-text-muted">
              — {reviews[activeReview]?.author}
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
        </div>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <div
          id="faq"
          ref={addRef("faq")}
          className="py-4 pb-14 px-8 max-md:px-5 max-w-[600px] mx-auto"
        >
          <div className="text-center mb-8">
            <div className="text-[11px] tracking-[3px] uppercase text-wr-copper mb-2.5 font-medium">
              FAQ
            </div>
            <h2 className="font-wr-heading text-[clamp(26px,4vw,32px)] font-light text-wr-text">
              {lp.lpFaqLabel}
            </h2>
          </div>

          <div className={`fade-up ${isVisible("faq") ? "visible" : ""}`}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="lp-faq-item border-b border-wr-border cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="py-4 flex justify-between items-center gap-3">
                  <div className="text-sm font-medium text-wr-text">{faq.question}</div>
                  <div
                    className="text-lg text-wr-copper shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </div>
                </div>
                {openFaq === i && (
                  <div className="pb-4 text-sm text-wr-text-body leading-[1.7] font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compact practitioner strip */}
      {practitioner && (
        <div className="bg-wr-cream border-t border-b border-wr-border py-7 px-8 text-center">
          <div className="max-w-[480px] mx-auto flex items-center gap-4 justify-center flex-wrap">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-wr-copper-light to-wr-copper flex items-center justify-center text-lg text-white shrink-0 font-wr-heading font-medium">
              {practitioner.name.split(" ").map(w => w[0]).join("")}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-wr-text">{practitioner.fullTitle}</div>
              <div className="text-xs text-wr-text-muted mt-0.5">
                {practitioner.credentials} · Founder, {business.name}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location */}
      <div
        id="location"
        ref={addRef("location")}
        className="py-12 px-8 max-md:px-5 max-w-[700px] mx-auto"
      >
        <div className="text-center mb-6">
          <h2 className="font-wr-heading text-2xl font-light text-wr-text">
            {business.address.replace(/^\d+\s*/, "")}, Downtown {business.city}
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
              <img
                src={`/images/maps/${business.slug}.png`}
                alt={`Map showing ${business.name} at ${business.address}`}
                className="w-full h-[180px] object-cover"
              />
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
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {[
              { label: business.parking || "Free parking", icon: "P" },
              { label: business.hours.filter(h => !h.closed).length > 0
                ? `${business.hours.filter(h => !h.closed)[0]?.day?.slice(0,3)}–${business.hours.filter(h => !h.closed).slice(-1)[0]?.day?.slice(0,3)} ${business.hours.filter(h => !h.closed)[0]?.open?.replace(/:00/g, "").toLowerCase()}–${business.hours.filter(h => !h.closed)[0]?.close?.replace(/:00/g, "").toLowerCase()}`
                : "See hours", icon: "◷" },
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
          Ready to try {service.name.toLowerCase()}?
        </h2>
        {promo && (
          <p className="text-sm text-wr-text-muted mb-7 font-light">
            Use code <strong className="text-wr-copper font-medium">{promo.code}</strong> for {promo.description}.
          </p>
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={service.bookingUrl}
            className="bg-wr-copper text-white border-none py-[15px] px-8 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center rounded-lg transition-all duration-[250ms] hover:bg-wr-copper-dark hover:shadow-[0_4px_16px_rgba(184,132,90,0.3)] hover:-translate-y-px"
          >
            Book {service.name}
          </a>
          <a
            href={`tel:${business.phone.replace(/[^0-9]/g, "")}`}
            className="bg-transparent text-wr-text border-[1.5px] border-wr-copper py-[13px] px-7 text-[13px] font-medium tracking-[1.5px] uppercase no-underline inline-flex items-center rounded-lg transition-all duration-[250ms] hover:bg-wr-copper hover:text-white"
          >
            Call {business.phone}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-wr-border py-7 px-8 text-center">
        <div className="flex justify-center gap-6 mb-3.5 flex-wrap">
          <a href={`/b/${business.slug}`} className="text-[13px] text-wr-text-body no-underline">
            All services
          </a>
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
          {business.address}, {business.city}, {business.state}
        </div>
        <div className="text-[11px] text-wr-text-faint mt-2.5">
          Powered by <a href="https://lantern.llc" className="text-wr-text-subtle no-underline">Lantern</a>
        </div>
      </div>
    </div>
  );
}
