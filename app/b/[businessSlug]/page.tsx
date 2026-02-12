import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBusinessBySlug } from "@/data/businesses";
import BusinessLandingClient from "./BusinessLandingClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}): Promise<Metadata> {
  const { businessSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) return {};

  return {
    title: `${business.name} — Book Now`,
    description: business.heroSubtitle,
  };
}

export default async function BusinessLandingPage({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) notFound();

  return <BusinessLandingClient business={business} />;
}
