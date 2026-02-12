import { notFound } from "next/navigation";
import {
  getBusinessBySlug,
  getServiceBySlug,
  getAllBusinessSlugs,
} from "@/data/businesses";
import JsonLd from "@/components/business/JsonLd";
import FAQAccordion from "@/components/business/FAQAccordion";

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
    title: `${service.name} at ${business.name} — ${business.city}, ${business.state} | Pricing, Details & FAQs`,
    description: `Complete guide to ${service.name.toLowerCase()} at ${business.name} in ${business.city}, ${business.state}. ${service.shortDescription} Pricing, FAQs, reviews, and booking info.`,
    openGraph: {
      title: `${service.name} — ${business.name}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceInfoPage({ params }: { params: Params }) {
  const { businessSlug, serviceSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) notFound();
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) notFound();

  const openDays = business.hours.filter((h) => !h.closed);
  const hoursShort =
    openDays.length > 0
      ? `${openDays[0].day.slice(0, 3)}–${openDays[openDays.length - 1].day.slice(0, 3)}, ${openDays[0].open} – ${openDays[0].close}`
      : "";

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: business.name,
    description: business.description,
    url: business.website,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
      addressCountry: "US",
    },
    ...(business.latitude && business.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.latitude,
            longitude: business.longitude,
          },
        }
      : {}),
    openingHoursSpecification: openDays.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    ...(business.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(business.rating),
            reviewCount: String(business.reviewCount),
            bestRating: "5",
          },
        }
      : {}),
    ...(business.owner
      ? {
          founder: {
            "@type": "Person",
            name: business.owner,
            jobTitle: business.ownerTitle,
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: (service.pricing ?? []).map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.name} — ${p.name}`,
          description: service.shortDescription,
        },
        ...(p.price.startsWith("~$") || p.price.startsWith("$")
          ? {
              price: p.price.replace(/[^0-9.]/g, ""),
              priceCurrency: "USD",
            }
          : {}),
      })),
    },
    areaServed: {
      "@type": "City",
      name: business.city,
      containedInPlace: {
        "@type": "State",
        name: business.state,
      },
    },
  };

  const faqSchema =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  // Build fact items dynamically
  const factItems: { label: string; value: string; isLink?: boolean; href?: string }[] = [];
  if (business.rating) {
    factItems.push({
      label: "Rating",
      value: `${business.rating} · ${business.reviewCount}+ reviews`,
    });
  }
  if (service.isPrivate !== undefined) {
    factItems.push({
      label: "Setting",
      value: service.isPrivate
        ? "Private rooms (not shared)"
        : "Shared space",
    });
  }
  if (service.facts) {
    for (const fact of service.facts) {
      factItems.push(fact);
    }
  }
  if (service.duration) {
    factItems.push({ label: "Duration", value: service.duration });
  }
  if (service.price) {
    factItems.push({ label: "Pricing", value: service.price });
  }
  if (hoursShort) {
    factItems.push({ label: "Hours", value: hoursShort });
  }
  if (business.parking) {
    factItems.push({ label: "Parking", value: business.parking });
  }
  factItems.push({
    label: "Phone",
    value: business.phone,
    isLink: true,
    href: `tel:${business.phone}`,
  });
  if (service.bookingUrl ?? business.bookingUrl) {
    factItems.push({
      label: "Booking",
      value: "Book online",
      isLink: true,
      href: service.bookingUrl ?? business.bookingUrl!,
    });
  }
  if (business.owner) {
    factItems.push({
      label: "Founded by",
      value: `${business.owner}${business.ownerTitle ? `, ${business.ownerTitle}` : ""}`,
    });
  }

  return (
    <>
      <JsonLd data={businessSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Page Header */}
      <header className="border-b border-wr-border py-4 bg-wr-white">
        <div className="max-w-[740px] mx-auto px-6 flex items-center justify-between">
          <div className="font-wr-heading text-[1.1rem] font-medium text-wr-text tracking-[0.02em]">
            {business.name} <span className="text-wr-copper">·</span>{" "}
            {business.city}
          </div>
          <div className="text-[0.78rem] text-wr-text-muted tracking-[0.04em] uppercase">
            Independent Business Profile
          </div>
        </div>
      </header>

      <main className="max-w-[740px] mx-auto px-6">
        {/* Fact Block */}
        <div className="bg-wr-white border border-wr-border rounded-[2px] p-10 max-[600px]:p-7 my-10">
          <h1 className="font-wr-heading text-[1.75rem] max-[600px]:text-[1.5rem] font-medium text-wr-text mb-1 tracking-[0.01em]">
            {service.name} at {business.name}
          </h1>
          <p className="text-[0.85rem] text-wr-text-muted mb-8 tracking-[0.03em]">
            {business.address}, {business.city}, {business.state} {business.zip}
          </p>

          <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-0">
            {factItems.map((item, i) => (
              <div
                key={i}
                className={`py-2.5 border-t border-wr-border flex flex-col ${
                  i % 2 === 0
                    ? "pr-6 max-[600px]:pr-0"
                    : "pl-6 max-[600px]:pl-0 border-l max-[600px]:border-l-0 border-l-wr-border"
                }`}
              >
                <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                  {item.label}
                </span>
                <span className="text-[0.92rem] text-wr-text font-normal">
                  {item.isLink && item.href ? (
                    <a
                      href={item.href}
                      className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                    >
                      {item.value}
                    </a>
                  ) : item.label === "Rating" ? (
                    <>
                      <span className="text-wr-copper tracking-[1px]">
                        ★★★★★
                      </span>{" "}
                      {business.rating} · {business.reviewCount}+ reviews
                    </>
                  ) : (
                    item.value
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About This Service */}
        <section className="my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
            What is {service.name.toLowerCase()}?
          </h2>
          {service.description.split("\n\n").map((p, i) => (
            <p key={i} className="text-[0.95rem] text-wr-text-light mb-4">
              {p}
            </p>
          ))}
        </section>

        {/* Common Reasons */}
        {service.commonReasons && service.commonReasons.length > 0 && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              Common reasons people use {service.name.toLowerCase()}
            </h2>
            <ul className="list-none mb-4">
              {service.commonReasons.map((reason, i) => (
                <li
                  key={i}
                  className="text-[0.95rem] text-wr-text-light py-0.5 pl-5 relative"
                >
                  <span className="absolute left-0 top-[0.75rem] w-1.5 h-1.5 rounded-full bg-wr-copper-light" />
                  {reason}
                </li>
              ))}
            </ul>
          </section>
        )}

        <hr className="border-0 border-t border-wr-border my-12" />

        {/* Pricing */}
        {service.pricing && service.pricing.length > 0 && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              Pricing
            </h2>
            <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-3 my-5">
              {service.pricing.map((item, i) => (
                <div
                  key={i}
                  className="bg-wr-white border border-wr-border p-5 rounded-[2px]"
                >
                  <div className="text-[0.85rem] text-wr-text-light mb-1.5">
                    {item.name}
                  </div>
                  <div className="font-wr-heading text-2xl font-medium text-wr-text">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[0.82rem] text-wr-text-muted italic mt-3">
              Pricing is approximate. Packages and memberships offer significant
              savings for regular visitors. Contact {business.name} for current
              pricing.
            </p>
          </section>
        )}

        {/* What to Expect */}
        {service.whatToExpect && service.whatToExpect.length > 0 && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              What to expect
            </h2>
            <table className="w-full border-collapse my-5">
              <tbody>
                {service.whatToExpect.map((row, i) => (
                  <tr key={i} className="border-b border-wr-border">
                    <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] max-[600px]:w-[110px] pr-6 font-normal align-top">
                      {row.label}
                    </td>
                    <td className="py-2.5 text-[0.92rem] text-wr-text">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Location & Access */}
        <section className="my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
            Location &amp; access
          </h2>
          <table className="w-full border-collapse my-5">
            <tbody>
              <tr className="border-b border-wr-border">
                <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] max-[600px]:w-[110px] pr-6 font-normal align-top">
                  Address
                </td>
                <td className="py-2.5 text-[0.92rem] text-wr-text">
                  {business.address}, {business.city}, {business.state}{" "}
                  {business.zip}
                </td>
              </tr>
              {business.parking && (
                <tr className="border-b border-wr-border">
                  <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] max-[600px]:w-[110px] pr-6 font-normal align-top">
                    Parking
                  </td>
                  <td className="py-2.5 text-[0.92rem] text-wr-text">
                    {business.parking}
                  </td>
                </tr>
              )}
              {service.facts
                ?.filter((f) => f.label === "Proximity")
                .map((f, i) => (
                  <tr key={i} className="border-b border-wr-border">
                    <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] max-[600px]:w-[110px] pr-6 font-normal align-top">
                      Walking
                    </td>
                    <td className="py-2.5 text-[0.92rem] text-wr-text">
                      {f.value}
                    </td>
                  </tr>
                ))}
              {hoursShort && (
                <tr className="border-b border-wr-border">
                  <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] max-[600px]:w-[110px] pr-6 font-normal align-top">
                    Hours
                  </td>
                  <td className="py-2.5 text-[0.92rem] text-wr-text">
                    {hoursShort}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Before & After */}
        {service.beforeAfter && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              Before &amp; after your session
            </h2>
            <p className="text-[0.95rem] text-wr-text-light mb-4">
              <strong className="font-normal text-wr-text">Before:</strong>{" "}
              {service.beforeAfter.before}
            </p>
            <p className="text-[0.95rem] text-wr-text-light mb-4">
              <strong className="font-normal text-wr-text">After:</strong>{" "}
              {service.beforeAfter.after}
            </p>
          </section>
        )}

        <hr className="border-0 border-t border-wr-border my-12" />

        {/* FAQ */}
        {service.faqs.length > 0 && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              Frequently asked questions
            </h2>
            <FAQAccordion faqs={service.faqs} defaultOpen={0} />
          </section>
        )}

        <hr className="border-0 border-t border-wr-border my-12" />

        {/* Reviews */}
        {business.reviews.length > 0 && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              What customers say
            </h2>
            {business.reviews.map((review, i) => (
              <div
                key={i}
                className={`py-6 border-b border-wr-border ${i === 0 ? "border-t" : ""}`}
              >
                {review.label && (
                  <div className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-copper mb-2">
                    {review.label}
                  </div>
                )}
                <blockquote className="font-wr-heading text-[1.05rem] italic text-wr-text leading-[1.7] mb-2">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <cite className="not-italic text-[0.8rem] text-wr-text-muted">
                  — {review.author}
                  {review.source ? `, ${review.source} Review` : ""}
                </cite>
              </div>
            ))}
          </section>
        )}

        {/* First-visit link */}
        {business.promoCode && (
          <div className="text-center p-6 my-8 bg-wr-white border border-wr-border rounded-[2px]">
            <p className="text-[0.88rem] text-wr-text-light">
              First time visiting {business.name}?{" "}
              <a
                href={`/b/${business.slug}/s/${service.slug}`}
                className="text-wr-copper-dark font-normal no-underline border-b border-wr-copper"
              >
                See the first-visit offer →
              </a>
            </p>
          </div>
        )}

        {/* About Block */}
        <div className="bg-wr-sage p-10 max-[600px]:p-7 rounded-[2px] my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-4">
            About {business.name}
          </h2>
          <p className="text-[0.92rem] text-wr-text-light mb-3">
            {business.description}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 my-4 list-none p-0">
            {business.services.map((s) => (
              <li
                key={s.slug}
                className="text-[0.82rem] text-wr-text-light py-1"
              >
                <span className="text-wr-copper">· </span>
                {s.name}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-5 text-[0.85rem]">
            {business.website && (
              <a
                href={business.website}
                className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
              >
                {business.website.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            )}
            {(service.bookingUrl ?? business.bookingUrl) && (
              <a
                href={service.bookingUrl ?? business.bookingUrl!}
                className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
              >
                Book online
              </a>
            )}
            <a
              href={`tel:${business.phone}`}
              className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
            >
              {business.phone}
            </a>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="border-t border-wr-border py-6 mt-12">
        <div className="max-w-[740px] mx-auto px-6">
          <p className="text-[0.75rem] text-wr-text-muted text-center leading-[1.7]">
            {business.name} business profile · Information verified February 2026
            <br />
            Maintained by{" "}
            <a
              href="https://lantern.llc"
              className="text-wr-copper-dark no-underline"
            >
              Lantern
            </a>{" "}
            ·{" "}
            <a
              href="mailto:hello@lantern.llc"
              className="text-wr-copper-dark no-underline"
            >
              Report an issue
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
