import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/data/businesses";
import JsonLd from "@/components/business/JsonLd";
import FAQAccordion from "@/components/business/FAQAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) return {};
  return {
    title: `${business.name} — ${business.city}, ${business.state} | Business Information`,
    description: `Complete guide to ${business.name} in ${business.city}, ${business.state}. ${business.services.map((s) => s.name).join(", ")}. Hours, pricing, FAQs, reviews, and booking info.`,
    openGraph: {
      title: business.name,
      description: business.description,
      type: "website",
    },
  };
}

export default async function BusinessInfoPage({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) notFound();

  const hoursSummary = business.hours
    .filter((h) => !h.closed)
    .map((h) => `${h.day}: ${h.open}–${h.close}`)
    .join(", ");

  const openDays = business.hours.filter((h) => !h.closed);
  const hoursShort =
    openDays.length > 0
      ? `${openDays[0].day.slice(0, 3)}–${openDays[openDays.length - 1].day.slice(0, 3)}, ${openDays[0].open} – ${openDays[0].close}`
      : "";

  const localBusinessSchema = {
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
    openingHoursSpecification: business.hours
      .filter((h) => !h.closed)
      .map((h) => ({
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
      name: "Services",
      itemListElement: business.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.shortDescription,
        },
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
    business.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: business.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Page Header */}
      <header className="border-b border-wr-border py-4 bg-wr-white">
        <div className="max-w-[740px] mx-auto px-6 flex items-center justify-between">
          <div className="font-wr-heading text-[1.1rem] font-medium text-wr-text tracking-[0.02em]">
            {business.name}{" "}
            <span className="text-wr-copper">·</span> {business.city}
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
            {business.name}
          </h1>
          <p className="text-[0.85rem] text-wr-text-muted mb-8 tracking-[0.03em]">
            {business.address}, {business.city}, {business.state} {business.zip}
          </p>

          <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-0">
            {/* Rating */}
            {business.rating && (
              <div className="py-2.5 border-t border-wr-border flex flex-col pr-6 max-[600px]:pr-0">
                <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                  Rating
                </span>
                <span className="text-[0.92rem] text-wr-text font-normal">
                  <span className="text-wr-copper tracking-[1px]">★★★★★</span>{" "}
                  {business.rating} · {business.reviewCount}+ reviews
                </span>
              </div>
            )}
            {/* Services */}
            <div className="py-2.5 border-t border-wr-border max-[600px]:border-l-0 border-l border-l-wr-border flex flex-col pl-6 max-[600px]:pl-0">
              <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                Services
              </span>
              <span className="text-[0.92rem] text-wr-text font-normal">
                {business.services.length} offered
              </span>
            </div>
            {/* Hours */}
            <div className="py-2.5 border-t border-wr-border flex flex-col pr-6 max-[600px]:pr-0">
              <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                Hours
              </span>
              <span className="text-[0.92rem] text-wr-text font-normal">
                {hoursShort}
              </span>
            </div>
            {/* Parking */}
            {business.parking && (
              <div className="py-2.5 border-t border-wr-border max-[600px]:border-l-0 border-l border-l-wr-border flex flex-col pl-6 max-[600px]:pl-0">
                <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                  Parking
                </span>
                <span className="text-[0.92rem] text-wr-text font-normal">
                  {business.parking}
                </span>
              </div>
            )}
            {/* Phone */}
            <div className="py-2.5 border-t border-wr-border flex flex-col pr-6 max-[600px]:pr-0">
              <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                Phone
              </span>
              <span className="text-[0.92rem] text-wr-text font-normal">
                <a
                  href={`tel:${business.phone}`}
                  className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                >
                  {business.phone}
                </a>
              </span>
            </div>
            {/* Booking */}
            {business.bookingUrl && (
              <div className="py-2.5 border-t border-wr-border max-[600px]:border-l-0 border-l border-l-wr-border flex flex-col pl-6 max-[600px]:pl-0">
                <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                  Booking
                </span>
                <span className="text-[0.92rem] text-wr-text font-normal">
                  <a
                    href={business.bookingUrl}
                    className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                  >
                    Book online
                  </a>
                </span>
              </div>
            )}
            {/* Founded by */}
            {business.owner && (
              <div className="py-2.5 border-t border-wr-border flex flex-col pr-6 max-[600px]:pr-0">
                <span className="text-[0.7rem] uppercase tracking-[0.1em] text-wr-text-muted mb-0.5">
                  Founded by
                </span>
                <span className="text-[0.92rem] text-wr-text font-normal">
                  {business.owner}
                  {business.ownerTitle ? `, ${business.ownerTitle}` : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* About */}
        <section className="my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
            About {business.name}
          </h2>
          <p className="text-[0.95rem] text-wr-text-light mb-4">
            {business.description}
          </p>
        </section>

        {/* Services */}
        <section className="my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
            Services
          </h2>
          <div className="space-y-4">
            {business.services.map((service) => (
              <div
                key={service.slug}
                className="border-b border-wr-border pb-4 last:border-0"
              >
                <h3 className="font-normal text-wr-text text-[0.95rem]">
                  <a
                    href={`/b/${business.slug}/s/${service.slug}/info`}
                    className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                  >
                    {service.name}
                  </a>
                </h3>
                <p className="text-[0.95rem] text-wr-text-light mt-0.5">
                  {service.shortDescription}
                </p>
                <div className="flex gap-4 mt-1 text-[0.82rem] text-wr-text-muted">
                  {service.duration && <span>{service.duration}</span>}
                  {service.price && <span>{service.price}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hours */}
        <section className="my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
            Hours
          </h2>
          <table className="w-full border-collapse my-5">
            <tbody>
              {business.hours.map((h) => (
                <tr key={h.day} className="border-b border-wr-border">
                  <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] pr-6 font-normal align-top">
                    {h.day}
                  </td>
                  <td className="py-2.5 text-[0.92rem] text-wr-text">
                    {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Contact */}
        <section className="my-12">
          <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
            Contact
          </h2>
          <table className="w-full border-collapse my-5">
            <tbody>
              <tr className="border-b border-wr-border">
                <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] pr-6 font-normal align-top">
                  Address
                </td>
                <td className="py-2.5 text-[0.92rem] text-wr-text">
                  {business.address}, {business.city}, {business.state}{" "}
                  {business.zip}
                </td>
              </tr>
              <tr className="border-b border-wr-border">
                <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] pr-6 font-normal align-top">
                  Phone
                </td>
                <td className="py-2.5 text-[0.92rem] text-wr-text">
                  <a
                    href={`tel:${business.phone}`}
                    className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                  >
                    {business.phone}
                  </a>
                </td>
              </tr>
              {business.website && (
                <tr className="border-b border-wr-border">
                  <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] pr-6 font-normal align-top">
                    Website
                  </td>
                  <td className="py-2.5 text-[0.92rem] text-wr-text">
                    <a
                      href={business.website}
                      className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {business.website.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </td>
                </tr>
              )}
              {business.bookingUrl && (
                <tr className="border-b border-wr-border">
                  <td className="py-2.5 text-wr-text-muted text-[0.8rem] uppercase tracking-[0.06em] w-[140px] pr-6 font-normal align-top">
                    Booking
                  </td>
                  <td className="py-2.5 text-[0.92rem] text-wr-text">
                    <a
                      href={business.bookingUrl}
                      className="text-wr-copper-dark no-underline border-b border-wr-copper-light"
                    >
                      Book online
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* FAQ */}
        {business.faqs.length > 0 && (
          <section className="my-12">
            <h2 className="font-wr-heading text-[1.35rem] font-medium text-wr-text mb-5 tracking-[0.01em]">
              Frequently asked questions
            </h2>
            <FAQAccordion faqs={business.faqs} defaultOpen={0} />
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
                href={`/b/${business.slug}`}
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
            {business.bookingUrl && (
              <a
                href={business.bookingUrl}
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
