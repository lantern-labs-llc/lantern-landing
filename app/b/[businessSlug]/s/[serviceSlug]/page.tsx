import { notFound } from "next/navigation";
import {
  getBusinessBySlug,
  getServiceBySlug,
  getAllBusinessSlugs,
} from "@/data/businesses";
import JsonLd from "@/components/business/JsonLd";
import PerkCard from "@/components/business/PerkCard";
import CTAButton from "@/components/business/CTAButton";
import PageFooter from "@/components/business/PageFooter";
import StickyMobileCTA from "@/components/business/StickyMobileCTA";

type Params = Promise<{ businessSlug: string; serviceSlug: string }>;

export async function generateStaticParams() {
  const slugs = getAllBusinessSlugs();
  const params: { businessSlug: string; serviceSlug: string }[] = [];
  for (const businessSlug of slugs) {
    const business = getBusinessBySlug(businessSlug);
    if (business) {
      for (const service of business.services) {
        params.push({ businessSlug, serviceSlug: service.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { businessSlug, serviceSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) return {};
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) return {};
  return {
    title: `${service.name} at ${business.name} — ${business.promoCode?.discount ?? ""} Off Your First Visit`,
    description: `${service.shortDescription} at ${business.name} in ${business.city}, ${business.state}.${business.promoCode ? ` Use code ${business.promoCode.code} for ${business.promoCode.description}.` : ""}`,
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Params;
}) {
  const { businessSlug, serviceSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) notFound();
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) notFound();

  const ctaHref =
    service.bookingUrl ?? business.bookingUrl ?? `tel:${business.phone}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${service.name} at ${business.name} — First Visit Offer`,
    description: `${service.shortDescription} at ${business.name} in ${business.city}, ${business.state}.`,
    about: {
      "@type": "HealthAndBeautyBusiness",
      name: business.name,
      url: business.website,
    },
    ...(business.promoCode
      ? {
          offers: {
            "@type": "Offer",
            name: `First Visit — ${business.promoCode.discount} Off`,
            description: `${business.promoCode.description}. Use code ${business.promoCode.code}.`,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  // Find a relevant review (prefer one mentioning this service)
  const serviceNameLower = service.name.toLowerCase();
  const relevantReview =
    business.reviews.find((r) =>
      r.text.toLowerCase().includes(serviceNameLower)
    ) ?? business.reviews[0];

  return (
    <>
      <JsonLd data={webPageSchema} />

      {/* Hero */}
      <section
        id="hero"
        className="bg-wr-white py-12 pb-10 text-center border-b border-wr-border"
      >
        <div className="max-w-[600px] mx-auto px-6">
          <div className="text-[0.72rem] uppercase tracking-[0.18em] text-wr-copper mb-6">
            {service.name} at {business.name}
          </div>
          <h1 className="font-wr-heading font-light text-[2.4rem] max-[600px]:text-[1.9rem] leading-[1.2] text-wr-text mb-3 tracking-[-0.01em]">
            Your first visit,
            <br />
            <em className="italic text-wr-copper-dark">
              {business.promoCode?.discount ?? "15%"} off
            </em>
          </h1>
          <p className="text-base text-wr-text-light max-w-[400px] mx-auto mb-8 leading-[1.6]">
            {service.shortDescription} at {business.name} in {business.city}.
          </p>

          {business.promoCode && <PerkCard promo={business.promoCode} />}

          <div className="flex gap-3 justify-center flex-wrap mb-4">
            <CTAButton href={ctaHref}>Book Now →</CTAButton>
            <CTAButton href={`tel:${business.phone}`} variant="secondary">
              Call {business.phone}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      {business.trustSignals && business.trustSignals.length > 0 && (
        <section className="py-10 border-b border-wr-border">
          <div className="max-w-[600px] mx-auto px-6">
            <div className="grid grid-cols-3 max-[600px]:grid-cols-1 gap-4 max-[600px]:gap-6 text-center">
              {business.trustSignals.map((signal, i) => (
                <div key={i} className="px-2">
                  <span className="text-2xl text-wr-copper block mb-1.5">
                    {signal.icon}
                  </span>
                  <div className="font-wr-heading text-base font-medium text-wr-text mb-0.5">
                    {signal.title}
                  </div>
                  <div className="text-[0.78rem] text-wr-text-muted leading-[1.5]">
                    {signal.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-12 border-b border-wr-border">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-wr-heading font-normal text-2xl text-center text-wr-text mb-8">
            How to book {service.name.toLowerCase()}
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-9 h-9 rounded-full border border-wr-copper-light flex items-center justify-center font-wr-heading text-base font-medium text-wr-copper-dark mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-wr-body font-normal text-[0.95rem] text-wr-text mb-0.5">
                  Choose your session
                </h3>
                <p className="text-[0.88rem] text-wr-text-muted">
                  {service.duration ? `${service.duration} sessions available. ` : ""}
                  {service.price ? `Starting at ${service.price}.` : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-9 h-9 rounded-full border border-wr-copper-light flex items-center justify-center font-wr-heading text-base font-medium text-wr-copper-dark mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-wr-body font-normal text-[0.95rem] text-wr-text mb-0.5">
                  Book online in 30 seconds
                </h3>
                <p className="text-[0.88rem] text-wr-text-muted">
                  Choose your time
                  {business.promoCode
                    ? ` and enter code ${business.promoCode.code} at checkout for ${business.promoCode.discount} off.`
                    : "."}
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-9 h-9 rounded-full border border-wr-copper-light flex items-center justify-center font-wr-heading text-base font-medium text-wr-copper-dark mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-wr-body font-normal text-[0.95rem] text-wr-text mb-0.5">
                  Show up and relax
                </h3>
                <p className="text-[0.88rem] text-wr-text-muted">
                  {business.address}, {business.city}.
                  {business.parking ? ` ${business.parking}.` : ""} Everything
                  you need is provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12 border-b border-wr-border">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-wr-heading font-normal text-2xl text-center text-wr-text mb-8">
            About {service.name.toLowerCase()}
          </h2>
          {service.description.split("\n\n").map((p, i) => (
            <p
              key={i}
              className="text-[0.95rem] text-wr-text-light mb-4"
            >
              {p}
            </p>
          ))}
          {service.benefits.length > 0 && (
            <ul className="list-none mt-6">
              {service.benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="text-[0.95rem] text-wr-text-light py-0.5 pl-5 relative"
                >
                  <span className="absolute left-0 top-[0.75rem] w-1.5 h-1.5 rounded-full bg-wr-copper-light" />
                  {benefit}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Review */}
      {relevantReview && (
        <section className="py-12 text-center border-b border-wr-border">
          <div className="max-w-[600px] mx-auto px-6">
            <div className="text-wr-copper text-[0.9rem] tracking-[2px] mb-1.5">
              ★ ★ ★ ★ ★
            </div>
            <blockquote className="font-wr-heading text-[1.25rem] italic font-normal text-wr-text leading-[1.65] max-w-[480px] mx-auto mb-4">
              &ldquo;{relevantReview.text}&rdquo;
            </blockquote>
            <div className="text-[0.82rem] text-wr-text-muted">
              — {relevantReview.author}
              {relevantReview.source
                ? `, ${relevantReview.source} Review`
                : ""}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 text-center max-[600px]:pb-6">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-wr-heading font-normal text-2xl text-center text-wr-text mb-2">
            Ready to try {service.name.toLowerCase()}?
          </h2>
          {business.promoCode && (
            <>
              <p className="text-[0.9rem] text-wr-text-light mb-1">
                Use code{" "}
                <span className="font-medium text-wr-copper-dark tracking-[0.05em]">
                  {business.promoCode.code}
                </span>{" "}
                for {business.promoCode.description}.
              </p>
              <p className="text-[0.78rem] text-wr-text-muted mb-7">
                Valid for any service · Offer good for 30 days
              </p>
            </>
          )}
          <div className="flex gap-3 justify-center flex-wrap">
            <CTAButton href={ctaHref}>Book Now →</CTAButton>
            <CTAButton href={`tel:${business.phone}`} variant="secondary">
              Call {business.phone}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Page Footer */}
      <PageFooter business={business} />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA bookingUrl={ctaHref} phoneNumber={business.phone} />
    </>
  );
}
