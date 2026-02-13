import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getServiceBySlugForPage,
  getAllBusinessSlugs,
  getBusinessBySlug,
} from "@/data/businesses";
import ServiceLandingClient from "./ServiceLandingClient";

export async function generateStaticParams() {
  const slugs = await getAllBusinessSlugs();
  const params = [];
  for (const businessSlug of slugs) {
    const business = await getBusinessBySlug(businessSlug);
    if (!business) continue;
    for (const service of business.services) {
      params.push({ businessSlug, serviceSlug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { businessSlug, serviceSlug } = await params;
  const result = await getServiceBySlugForPage(businessSlug, serviceSlug, "lp");
  if (!result) return {};

  return {
    title: `${result.service.name} at ${result.business.name} — Book Now`,
    description: result.service.shortDescription,
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}) {
  const { businessSlug, serviceSlug } = await params;
  const result = await getServiceBySlugForPage(businessSlug, serviceSlug, "lp");
  if (!result) notFound();

  return <ServiceLandingClient business={result.business} service={result.service} />;
}
