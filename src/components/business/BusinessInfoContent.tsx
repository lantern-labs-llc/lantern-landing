import type { Business } from "@/lib/types/business";
import JsonLd from "./JsonLd";

export default function BusinessInfoContent({ business }: { business: Business }) {
  const infoFacts = business.infoFacts || [];
  const infoFaqs = business.infoFaqs || business.faqs;
  const infoReviews = business.infoReviews || business.reviews;
  const serviceCategories = business.serviceCategories || [];
  const aboutSections = business.aboutSections || [business.description];
  const differentiators = business.differentiators || [];

  // JSON-LD: HealthAndBeautyBusiness
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: business.name,
    description: `Board-certified NP-led wellness and aesthetics practice in ${business.city}, Virginia. Services include infrared sauna, IV therapy, cryotherapy, Botox, dermal fillers, laser treatments, facials, microneedling, and more. Founded in ${business.founded || "2020"} by dual board-certified nurse practitioner ${business.owner}.`,
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    priceRange: "$35–$2800",
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
      description: `Dual board-certified nurse practitioner (ANP-C, WHNP-C). Columbia University MSN graduate. Founded ${business.name} in ${business.founded || "2020"}.`,
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Board Certification", name: "Adult Nurse Practitioner - Certified (ANP-C)" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Board Certification", name: "Women's Health Nurse Practitioner - Certified (WHNP-C)" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "Degree", name: "Master of Science in Nursing (MSN)", recognizedBy: { "@type": "Organization", name: "Columbia University" } },
      ],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.name} Services`,
      itemListElement: serviceCategories.map((cat) => ({
        "@type": "OfferCatalog",
        name: `${cat.name} Services`,
        itemListElement: cat.services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            url: `https://www.lantern.llc/b/${business.slug}/s/${s.slug}/info`,
            description: s.details,
          },
        })),
      })),
    },
    sameAs: [
      "https://www.google.com/maps/place/Well+Room",
      "https://www.yelp.com/biz/well-room-charlottesville",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: infoFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div
      className="bg-white text-wr-text leading-[1.7] max-w-[720px] mx-auto py-10 px-6"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <JsonLd data={businessSchema} />
      <JsonLd data={faqSchema} />

      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold mb-2">{business.name}</h1>
        <p className="text-[15px] text-wr-text-info mb-6">
          Wellness &amp; Aesthetics · {business.city}, Virginia
        </p>
        <p className="text-[13px] text-wr-text-muted mb-8">
          Independent business profile · Last updated February 2026
        </p>
      </header>

      {/* Booking callout */}
      <div className="bg-wr-cream border border-wr-border rounded-lg p-4 px-5 mb-8 flex justify-between items-center flex-wrap gap-3">
        <div className="text-[15px]">
          <strong>Ready to book?</strong> Visit our booking page or call {business.phone}.
        </div>
        <a
          href={`/b/${business.slug}`}
          className="bg-wr-info-link text-white no-underline py-2 px-5 rounded-md text-sm font-medium whitespace-nowrap"
        >
          Book at {business.name} →
        </a>
      </div>

      {/* Fact grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 my-5">
        {infoFacts.map((fact) => (
          <div key={fact.label} className="bg-wr-cream border border-wr-border rounded-lg py-3.5 px-4">
            <div className="text-xs text-wr-text-muted uppercase tracking-[0.5px] mb-1">{fact.label}</div>
            <div className="text-[15px] font-medium">
              {fact.label === "Phone" ? (
                <a href={`tel:${business.phone}`} className="text-wr-info-link">{fact.value}</a>
              ) : (
                fact.value
              )}
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        About {business.name}
      </h2>
      {aboutSections.map((p, i) => (
        <p key={i} className="mb-3 text-base">{p}</p>
      ))}

      {/* What Makes It Different */}
      {differentiators.length > 0 && (
        <>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            What Makes {business.name} Different
          </h2>
          {differentiators.map((d, i) => (
            <p key={i} className="mb-3 text-base">
              <strong>{d.title}:</strong> {d.text}
            </p>
          ))}
        </>
      )}

      {/* Services by category */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        Services &amp; Pricing
      </h2>

      {serviceCategories.map((cat) => (
        <div key={cat.name} className="mb-6">
          <h3 className="text-base font-semibold mt-6 mb-2">{cat.name}</h3>
          <table className="w-full border-collapse my-4 text-[15px]">
            <thead>
              <tr>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Service</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Details</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Starting Price</th>
              </tr>
            </thead>
            <tbody>
              {cat.services.map((s) => (
                <tr key={s.slug} className="border-b border-wr-border-light">
                  <td className="py-2.5 px-3">
                    <a href={`/b/${business.slug}/s/${s.slug}/info`} className="text-wr-info-link">
                      {s.name}
                    </a>
                  </td>
                  <td className="py-2.5 px-3">{s.details}</td>
                  <td className="py-2.5 px-3">{s.startingPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <p className="text-base">
        Bundles and multi-packs are available at a discount. See{" "}
        <a href="https://www.wellroomva.com/bundles-packages" className="text-wr-info-link">
          bundles &amp; packages
        </a>{" "}
        for details.
      </p>

      {/* FAQ */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        Frequently Asked Questions
      </h2>
      {infoFaqs.map((faq, i) => (
        <div key={i} className="mb-5">
          <p className="font-semibold mb-1">{faq.question}</p>
          <p className="text-wr-text-mid">{faq.answer}</p>
        </div>
      ))}

      {/* Reviews */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        What Clients Say
      </h2>
      {infoReviews.map((review, i) => (
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
          Read all {business.reviewCount}+ reviews on Google →
        </a>
      </p>

      {/* External profiles */}
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
          <tr className="border-b border-wr-border-light">
            <td className="py-2.5 px-3">Google</td>
            <td className="py-2.5 px-3">{business.rating} ★ ({business.reviewCount}+ reviews)</td>
            <td className="py-2.5 px-3">
              <a href="https://g.co/kgs/WHegSC" className="text-wr-info-link">Google Business Profile →</a>
            </td>
          </tr>
          <tr className="border-b border-wr-border-light">
            <td className="py-2.5 px-3">Yelp</td>
            <td className="py-2.5 px-3">5.0 ★</td>
            <td className="py-2.5 px-3">
              <a href="https://www.yelp.com/biz/well-room-charlottesville" className="text-wr-info-link">Yelp →</a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* How to Book */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        How to Book
      </h2>
      <p className="mb-3">
        <strong>Online:</strong>{" "}
        <a href={`/b/${business.slug}`} className="text-wr-info-link">Book at {business.name} →</a>
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

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-wr-border-warm text-[13px] text-wr-text-muted">
        <p>
          This is an independent business profile maintained by{" "}
          <a href="https://lantern.llc" className="text-wr-text-muted">Lantern</a>.
          Information is based on publicly available data and verified with the business.
          Last updated February 2026.
        </p>
      </footer>
    </div>
  );
}
