import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getBusinessBySlug,
  getServiceBySlug,
  getAllBusinessSlugs,
} from "@/data/businesses";
import ServiceLandingClient from "./ServiceLandingClient";

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
    title: `${service.name} at ${business.name} — Book Now`,
    description: service.shortDescription,
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}) {
  const { businessSlug, serviceSlug } = await params;
  const business = getBusinessBySlug(businessSlug);
  if (!business) notFound();
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) notFound();

  return <ServiceLandingClient business={business} service={service} />;
}
