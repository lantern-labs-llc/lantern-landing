import type { Business, Service } from "@/lib/types/business";

/**
 * Fills in missing LP fields on a service using fallbacks from
 * the service's own non-LP data and the parent business.
 * Never overwrites existing LP data.
 */
export function resolveServiceLP(service: Service, business: Business) {
  const lpFaqs =
    service.lpFaqs ??
    (service.faqs?.length ? service.faqs.slice(0, 5) : []);

  const lpBenefits =
    service.lpBenefits ??
    (service.benefits?.length
      ? service.benefits.map((b) => ({ title: b, description: "" }))
      : []);

  const lpReviews =
    service.lpReviews ??
    (business.lpReviews ?? business.reviews ?? []).slice(0, 3);

  const lpTrustItems =
    service.lpTrustItems ??
    buildTrustItems(service, business);

  const lpExpectItems =
    service.lpExpectItems ??
    (service.whatsIncluded?.length
      ? service.whatsIncluded.map((item) => ({
          icon: "✦",
          title: item.title,
          description: item.description,
        }))
      : []);

  const lpBenefitLabel = service.lpBenefitLabel || "Benefits";
  const lpBenefitSectionTitle =
    service.lpBenefitSectionTitle || "What it does for you";
  const lpReviewLabel = service.lpReviewLabel || "What clients say";
  const lpFaqLabel = service.lpFaqLabel || "Common questions";

  return {
    lpFaqs,
    lpBenefits,
    lpReviews,
    lpTrustItems,
    lpExpectItems,
    lpBenefitLabel,
    lpBenefitSectionTitle,
    lpReviewLabel,
    lpFaqLabel,
    pricing: service.pricing ?? [],
  };
}

function buildTrustItems(service: Service, business: Business) {
  const items: { top: string; bottom: string }[] = [];

  if (business.rating) {
    const count = business.reviewCount
      ? `${business.reviewCount}+ reviews`
      : "reviews";
    items.push({ top: `${business.rating} ★`, bottom: count });
  }

  if (service.duration) {
    items.push({ top: service.duration, bottom: "per session" });
  }

  if (business.practitioner) {
    items.push({
      top: "Board certified",
      bottom: `${business.practitioner.credentials}-led care`,
    });
  }

  if (business.parking) {
    items.push({ top: business.parking, bottom: "On-site" });
  }

  return items;
}
