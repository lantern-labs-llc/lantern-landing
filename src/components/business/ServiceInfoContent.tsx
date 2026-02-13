import type { Business, Service } from "@/lib/types/business";
import JsonLd from "./JsonLd";

export default function ServiceInfoContent({ business, service }: { business: Business; service: Service }) {
  const facts = service.facts || [];
  const faqs = service.faqs || [];
  const reviews = service.infoReviews || [];
  const pricing = service.pricing || [];

  // JSON-LD: Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} at ${business.name}`,
    description: service.description,
    url: `https://www.lantern.llc/b/${business.slug}/s/${service.slug}/info`,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: business.name,
      url: business.website,
      telephone: `+1-${business.phone.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.replace("St NW", "Street NW"),
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.zip,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.latitude,
        longitude: business.longitude,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(business.rating),
        reviewCount: String(business.reviewCount),
        bestRating: "5",
      },
      founder: {
        "@type": "Person",
        name: business.owner,
        jobTitle: "Founder & Nurse Practitioner",
      },
    },
    ...(pricing.length > 0
      ? {
          offers: pricing.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price.replace(/[^0-9]/g, ""),
            priceCurrency: "USD",
            description: p.description || p.name,
          })),
        }
      : {}),
    areaServed: {
      "@type": "City",
      name: business.city,
      containedInPlace: { "@type": "State", name: business.state },
    },
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const educationalSections = service.educationalSections || [];
  const whatsIncluded = service.whatsIncluded || [];
  const externalProfiles = business.externalProfiles || [];

  return (
    <div
      className="bg-white text-wr-text leading-[1.7] max-w-[720px] mx-auto py-10 px-6"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold mb-2">
          {service.name} at {business.name}
        </h1>
        <p className="text-[15px] text-wr-text-info mb-6">
          {service.isPrivate ? "Private " : ""}
          {service.name} Sessions · {business.city}, {business.state}
        </p>
        <p className="text-[13px] text-wr-text-muted mb-8">
          Independent service profile · Last updated February 2026 ·{" "}
          <a href={`/b/${business.slug}/info`} className="text-wr-info-link">
            ← All {business.name} services
          </a>
        </p>
      </header>

      {/* Booking callout */}
      <div className="bg-wr-cream border border-wr-border rounded-lg p-4 px-5 mb-8 flex justify-between items-center flex-wrap gap-3">
        <div className="text-[15px]">
          <strong>Ready to book?</strong> Visit our booking page or call {business.phone}.
        </div>
        <a
          href={`/b/${business.slug}/s/${service.slug}`}
          className="bg-wr-info-link text-white no-underline py-2 px-5 rounded-md text-sm font-medium whitespace-nowrap"
        >
          Book {service.name} →
        </a>
      </div>

      {/* Fact grid */}
      {facts.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 my-5">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-wr-cream border border-wr-border rounded-lg py-3.5 px-4">
              <div className="text-xs text-wr-text-muted uppercase tracking-[0.5px] mb-1">
                {fact.label}
              </div>
              <div className="text-[15px] font-medium">{fact.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Educational content — data-driven */}
      {educationalSections.map((section, i) => (
        <div key={i}>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            {section.heading}
          </h2>
          {section.paragraphs.map((p, j) => (
            <p key={j} className="mb-3" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      ))}

      {/* Comparison table */}
      {service.comparisonTable && (
        <table className="w-full border-collapse my-4 text-[15px]">
          <thead>
            <tr>
              {service.comparisonTable.headers.map((h, i) => (
                <th key={i} className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {service.comparisonTable.rows.map((row, i) => (
              <tr key={i} className="border-b border-wr-border-light">
                {row.map((cell, j) => (
                  <td key={j} className={`py-2.5 px-3${j === 0 ? " font-semibold" : ""}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Research bottom line */}
      {service.researchBottomLine && (
        <div className="bg-wr-cream border border-wr-border rounded-lg p-4 px-5 my-5">
          <p><strong>Bottom line:</strong> {service.researchBottomLine}</p>
        </div>
      )}
      {service.researchSources && (
        <p className="text-[13px] text-wr-text-muted italic">{service.researchSources}</p>
      )}

      {/* Candidacy */}
      {service.candidacy && (
        <>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            Who Is {service.name} Good For?
          </h2>
          <p className="mb-3"><strong>Good candidates:</strong> {service.candidacy.goodFor}</p>
          <p className="mb-3"><strong>Who should consult a doctor first:</strong> {service.candidacy.consultFirst}</p>
          {service.candidacy.safety && (
            <p className="mb-3"><strong>General safety:</strong> {service.candidacy.safety}</p>
          )}
        </>
      )}

      {/* Well Room-specific section */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        {service.name} at {business.name}
      </h2>
      <p className="mb-3">{service.description}</p>

      {/* What's included */}
      {whatsIncluded.length > 0 && (
        <>
          <h3 className="text-base font-semibold mt-6 mb-2">What&apos;s included</h3>
          {whatsIncluded.map((item, i) => (
            <p key={i} className="mb-3">
              <strong>{item.title}.</strong> {item.description}
            </p>
          ))}
        </>
      )}

      {/* Pricing table */}
      {pricing.length > 0 && (
        <>
          <h3 className="text-base font-semibold mt-6 mb-2">Session options and pricing</h3>
          <table className="w-full border-collapse my-4 text-[15px]">
            <thead>
              <tr>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Session</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Price</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Best for</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((p) => (
                <tr key={p.name} className="border-b border-wr-border-light">
                  <td className="py-2.5 px-3">
                    {p.name}
                    {p.tag && ` (${p.tag.toLowerCase()})`}
                  </td>
                  <td className="py-2.5 px-3">{p.price}</td>
                  <td className="py-2.5 px-3">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {business.bundlesUrl && (
            <p className="mb-3">
              Multi-packs and bundles are also available at a discount. See{" "}
              <a href={business.bundlesUrl} className="text-wr-info-link">
                bundles &amp; packages
              </a>{" "}
              for current options.
            </p>
          )}
        </>
      )}

      {/* Before/After */}
      {service.beforeAfter && (
        <>
          <h3 className="text-base font-semibold mt-6 mb-2">Before your session</h3>
          <p className="mb-3">{service.beforeAfter.before}</p>
          <h3 className="text-base font-semibold mt-6 mb-2">After your session</h3>
          <p className="mb-3">{service.beforeAfter.after}</p>
        </>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mb-5">
              <p className="font-semibold mb-1">{faq.question}</p>
              <p className="text-wr-text-mid">{faq.answer}</p>
            </div>
          ))}
        </>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            What Clients Say About {service.name} at {business.name}
          </h2>
          {reviews.map((review, i) => (
            <div key={i} className="mb-5 p-4 bg-wr-cream rounded-lg border border-wr-border">
              <p className="italic mb-1.5">&ldquo;{review.text}&rdquo;</p>
              <p className="text-[13px] text-wr-text-muted">
                — {review.author}
                {review.source ? `, ${review.source} Review` : ""}
              </p>
            </div>
          ))}
          <p>
            <a href="https://g.co/kgs/WHegSC" className="text-wr-info-link">
              Read all {business.reviewCount}+ {business.name} reviews on Google →
            </a>
          </p>
        </>
      )}

      {/* External profiles */}
      {externalProfiles.length > 0 && (
        <>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            Reviews &amp; Profiles
          </h2>
          <table className="w-full border-collapse my-4 text-[15px]">
            <thead>
              <tr>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Platform</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Rating</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Link</th>
              </tr>
            </thead>
            <tbody>
              {externalProfiles.map((profile) => (
                <tr key={profile.platform} className="border-b border-wr-border-light">
                  <td className="py-2.5 px-3">{profile.platform}</td>
                  <td className="py-2.5 px-3">{profile.rating}{profile.reviewCount ? ` (${profile.reviewCount})` : ""}</td>
                  <td className="py-2.5 px-3"><a href={profile.url} className="text-wr-info-link">{profile.platform} →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* How to Book */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        How to Book
      </h2>
      <p className="mb-3">
        <strong>Online:</strong>{" "}
        <a href={`/b/${business.slug}/s/${service.slug}`} className="text-wr-info-link">
          Book {service.name} at {business.name} →
        </a>
      </p>
      <p className="mb-3">
        <strong>Phone:</strong>{" "}
        <a href={`tel:${business.phone}`} className="text-wr-info-link">{business.phone}</a>
      </p>
      <p className="mb-3">
        <strong>Address:</strong> {business.address.replace("St NW", "Street NW")}, {business.city}, {business.state} {business.zip} (
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.name}, ${business.address}, ${business.city}, ${business.state} ${business.zip}`)}`}
          className="text-wr-info-link"
        >
          Get directions
        </a>
        )
      </p>
      {business.website && (
        <p className="mb-3">
          <strong>Website:</strong>{" "}
          <a href={business.website} className="text-wr-info-link">
            {business.website.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        </p>
      )}
      <p className="mb-3">
        <strong>All services:</strong>{" "}
        <a href={`/b/${business.slug}/info`} className="text-wr-info-link">
          View all {business.name} services →
        </a>
      </p>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-wr-border-warm text-[13px] text-wr-text-muted">
        <p>
          This is an independent service profile maintained by{" "}
          <a href="https://lantern.llc" className="text-wr-text-muted">Lantern</a>.
          Health information is based on published research and should not be taken as medical advice.
          Consult a healthcare provider before starting any new wellness therapy.
          Last updated February 2026.
        </p>
      </footer>
    </div>
  );
}
