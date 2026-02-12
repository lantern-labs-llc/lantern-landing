import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getBusinessBySlug,
  getServiceBySlug,
  getAllBusinessSlugs,
} from "@/data/businesses";
import JsonLd from "@/components/business/JsonLd";

export async function generateStaticParams() {
  return getAllBusinessSlugs().flatMap((businessSlug) => {
    const business = getBusinessBySlug(businessSlug);
    if (!business) return [];
    return business.services.map((service) => ({
      businessSlug,
      serviceSlug: service.slug,
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { businessSlug, serviceSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) return {};
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) return {};
  return {
    title: `${service.name} at ${business.name} — ${business.city}, ${business.state} | How It Works, Pricing, FAQs`,
    description: `Everything you need to know about ${service.name.toLowerCase()} at ${business.name} in ${business.city}, ${business.state}. How it works, pricing, session options, and practical FAQs.`,
    alternates: {
      canonical: `https://www.lantern.llc/b/${business.slug}/s/${service.slug}/info`,
    },
  };
}

export default async function ServiceInfoPage({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}) {
  const { businessSlug, serviceSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) notFound();
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) notFound();

  const facts = service.facts || [];
  const faqs = service.faqs || [];
  const reviews = service.infoReviews || [];
  const pricing = service.pricing || [];
  const whatToExpect = service.whatToExpect || [];

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

  // Is this the infrared sauna? If so, render rich educational content
  const isSauna = service.slug === "infrared-sauna";

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
          {service.name} Sessions · {business.city}, Virginia
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

      {/* Educational content — Sauna-specific */}
      {isSauna && (
        <>
          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            What Is Infrared Sauna Therapy?
          </h2>
          <p className="mb-3">
            Infrared sauna therapy uses infrared light wavelengths to heat the body directly, rather than heating the surrounding air like a traditional sauna. Because the heat targets your body rather than the room, infrared saunas operate at lower, more comfortable air temperatures — typically 110–150°F compared to 150–195°F in a traditional Finnish sauna.
          </p>
          <p className="mb-3">There are two main types of infrared wavelengths used in sauna therapy:</p>
          <p className="mb-3">
            <strong>Near-infrared</strong> has a shorter wavelength and is absorbed closer to the skin&apos;s surface. It&apos;s associated with skin health, wound healing, and cellular repair. Near-infrared is the same wavelength range used in red light therapy devices.
          </p>
          <p className="mb-3">
            <strong>Far-infrared</strong> has a longer wavelength and penetrates deeper into tissue — research suggests approximately 1–2 inches. It&apos;s the primary driver of the deep warming and sweating effect. Far-infrared has been the focus of most clinical studies on infrared sauna therapy.
          </p>
          <p className="mb-3">
            {business.name}&apos;s sauna uses both near-infrared (carbon elements) and far-infrared (ceramic elements), providing the full spectrum of infrared wavelengths in a single session.
          </p>

          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            How Infrared Saunas Differ from Traditional Saunas
          </h2>
          <table className="w-full border-collapse my-4 text-[15px]">
            <thead>
              <tr>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info"></th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Infrared Sauna</th>
                <th className="text-left py-2.5 px-3 border-b border-wr-border-light font-semibold text-[13px] uppercase tracking-[0.5px] text-wr-text-info">Traditional (Finnish) Sauna</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["How it heats", "Light wavelengths heat the body directly", "Heated air (or steam) warms the body"],
                ["Air temperature", "110–150°F", "150–195°F"],
                ["Humidity", "Low (dry heat)", "Variable (dry to moderate)"],
                ["Sweating onset", "Slower, more gradual", "Faster, more intense"],
                ["Tolerance", "Generally easier for beginners", "Can feel overwhelming for some"],
                ["Session length", "20–40 minutes typical", "10–20 minutes typical"],
              ].map(([label, infrared, traditional]) => (
                <tr key={label} className="border-b border-wr-border-light">
                  <td className="py-2.5 px-3 font-semibold">{label}</td>
                  <td className="py-2.5 px-3">{infrared}</td>
                  <td className="py-2.5 px-3">{traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mb-3">
            Both types raise core body temperature, induce sweating, and increase heart rate. The choice often comes down to personal comfort — many people who find traditional saunas too intense prefer the gentler heat of infrared.
          </p>

          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            What the Research Says
          </h2>
          <p className="mb-3">
            Research on infrared saunas is growing but still early-stage. Most of the robust, large-scale sauna research has been conducted on traditional Finnish saunas. However, a body of smaller studies on infrared saunas shows promising results across several areas.
          </p>
          <h3 className="text-base font-semibold mt-6 mb-2">Cardiovascular health</h3>
          <p className="mb-3">
            A 2018 review published in Mayo Clinic Proceedings found that regular sauna bathing is associated with reduced risk of cardiovascular events, lower blood pressure, and improved vascular function. A 2009 review in Canadian Family Physician found that far-infrared sauna therapy showed benefits for systolic blood pressure, congestive heart failure symptoms, and vascular endothelial function, with no adverse events reported across the studies reviewed.
          </p>
          <h3 className="text-base font-semibold mt-6 mb-2">Pain and muscle recovery</h3>
          <p className="mb-3">
            A two-year study found infrared sauna therapy to be a promising method for treatment of chronic pain. Smaller studies have shown reduced delayed-onset muscle soreness (DOMS) when using infrared sauna after intense exercise. A 2009 study also found infrared saunas can improve short-term pain and stiffness for those with rheumatoid arthritis and ankylosing spondylitis.
          </p>
          <h3 className="text-base font-semibold mt-6 mb-2">Stress and relaxation</h3>
          <p className="mb-3">
            Heat exposure triggers the release of endorphins and can lower cortisol levels. While this is harder to quantify in clinical studies, subjective well-being and relaxation are consistently reported benefits across sauna research. A systematic review of 40 clinical studies found that sauna bathing may improve quality of life, with no serious adverse events reported.
          </p>
          <h3 className="text-base font-semibold mt-6 mb-2">What&apos;s not well-supported</h3>
          <p className="mb-3">
            Some commonly marketed claims lack strong evidence. Detoxification through sweating is frequently promoted, but medical experts note that the liver and kidneys — not sweat glands — are the body&apos;s primary detoxification organs. Cleveland Clinic and WebMD have both noted that detox claims are &ldquo;more marketing than science&rdquo; for most healthy individuals. Claims about significant weight loss are also overstated; any weight lost during a session is primarily water weight from sweating.
          </p>
          <div className="bg-wr-cream border border-wr-border rounded-lg p-4 px-5 my-5">
            <p>
              <strong>Bottom line:</strong> Infrared sauna therapy shows genuine promise for cardiovascular health, pain management, muscle recovery, and stress reduction. The research is still emerging and most studies are small, but no serious adverse effects have been reported. It&apos;s best understood as a complementary wellness practice — not a medical treatment — and is most beneficial as part of a broader health routine.
            </p>
          </div>
          <p className="text-[13px] text-wr-text-muted italic">
            Sources: Mayo Clinic Proceedings (2018), Canadian Family Physician (2009), PMC Systematic Review (2018), Cleveland Clinic, Popular Science (2025)
          </p>

          <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
            Who Is Infrared Sauna Good For?
          </h2>
          <p className="mb-3">
            <strong>Good candidates:</strong> People looking for relaxation and stress relief. Those with muscle soreness or chronic pain conditions (as a complement to other treatments). Athletes seeking post-workout recovery. People who find traditional saunas too hot or uncomfortable. Anyone curious about heat therapy who wants an accessible entry point.
          </p>
          <p className="mb-3">
            <strong>Who should consult a doctor first:</strong> People with cardiovascular conditions, peripheral neuropathy, or autoimmune conditions. Those taking medications that affect sweating or heat regulation. Pregnant women. People with difficulty sensing temperature changes.
          </p>
          <p className="mb-3">
            <strong>General safety:</strong> Stay hydrated before, during, and after your session. Avoid alcohol and heavy meals beforehand. Start with shorter sessions at lower temperatures if you&apos;re new to sauna therapy. Cleveland Clinic recommends beginning at around 110°F for 5–10 minutes and building up gradually.
          </p>
        </>
      )}

      {/* Well Room-specific section */}
      <h2 className="text-[19px] font-semibold mt-10 mb-4 pb-2 border-b border-wr-border-warm">
        {service.name} at {business.name}
      </h2>
      <p className="mb-3">{service.description}</p>

      {isSauna && (
        <>
          <h3 className="text-base font-semibold mt-6 mb-2">What&apos;s included in every session</h3>
          <p className="mb-3">
            <strong>Private room.</strong> {business.name}&apos;s sauna room is never shared with other clients. It&apos;s a spacious room with a 4-person infrared sauna — all to yourself (or bring a partner or friend).
          </p>
          <p className="mb-3">
            <strong>Near + far infrared.</strong> The sauna uses both carbon (near-infrared) and ceramic (far-infrared) heating elements, delivering both wavelength ranges in a single session.
          </p>
          <p className="mb-3">
            <strong>Red light therapy.</strong> Built into the sauna at no extra charge. Red light (near-infrared spectrum) is associated with skin health, collagen production, and cellular repair.
          </p>
          <p className="mb-3">
            <strong>Bluetooth connectivity.</strong> Connect your phone to play music, a podcast, or whatever helps you unwind.
          </p>
          <p className="mb-3">
            <strong>Towels and amenities.</strong> Clean towels provided, including cold towels for cooling down after your session. The space includes a comfortable lounge area for before and after.
          </p>
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
          <p className="mb-3">
            Multi-packs and bundles are also available at a discount. See{" "}
            <a href="https://www.wellroomva.com/bundles-packages" className="text-wr-info-link">
              bundles &amp; packages
            </a>{" "}
            for current options.
          </p>
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
            <td className="py-2.5 px-3"><a href="https://g.co/kgs/WHegSC" className="text-wr-info-link">Google Business Profile →</a></td>
          </tr>
          <tr className="border-b border-wr-border-light">
            <td className="py-2.5 px-3">Yelp</td>
            <td className="py-2.5 px-3">5.0 ★</td>
            <td className="py-2.5 px-3"><a href="https://www.yelp.com/biz/well-room-charlottesville" className="text-wr-info-link">Yelp →</a></td>
          </tr>
        </tbody>
      </table>

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
