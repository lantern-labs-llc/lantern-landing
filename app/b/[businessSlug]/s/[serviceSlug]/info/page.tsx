import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getServiceBySlugForPage,
  getAllBusinessSlugs,
  getBusinessBySlug,
} from "@/data/businesses";
import ServiceInfoContent from "@/components/business/ServiceInfoContent";

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
  const result = await getServiceBySlugForPage(businessSlug, serviceSlug, "info");
  if (!result) return {};
  const { business, service } = result;
  return {
    title: service.metaTitle || `${service.name} at ${business.name} — ${business.city}, ${business.state} | How It Works, Pricing, FAQs`,
    description: service.metaDescription || `Everything you need to know about ${service.name.toLowerCase()} at ${business.name} in ${business.city}, ${business.state}. How it works, pricing, session options, and practical FAQs.`,
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
  const result = await getServiceBySlugForPage(businessSlug, serviceSlug, "info");
  if (!result) notFound();

  return <ServiceInfoContent business={result.business} service={result.service} />;
}
