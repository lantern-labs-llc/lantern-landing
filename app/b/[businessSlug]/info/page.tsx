import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBusinessBySlugForPage } from "@/data/businesses";
import BusinessInfoContent from "@/components/business/BusinessInfoContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}): Promise<Metadata> {
  const { businessSlug } = await params;
  const business = await getBusinessBySlugForPage(businessSlug, "info");
  if (!business) return {};
  return {
    title: `${business.name} — Wellness & Aesthetics in ${business.city}, ${business.state} | Services, Pricing & Info`,
    description: `${business.name} is a board-certified NP-led wellness and aesthetics practice in ${business.city}, ${business.state}. Infrared sauna, IV therapy, cryotherapy, Botox, fillers, laser treatments, facials, and more. ${business.rating} stars, ${business.reviewCount}+ Google reviews.`,
    alternates: {
      canonical: `https://www.lantern.llc/b/${business.slug}/info`,
    },
  };
}

export default async function BusinessInfoPage({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlugForPage(businessSlug, "info");
  if (!business) notFound();

  return <BusinessInfoContent business={business} />;
}
