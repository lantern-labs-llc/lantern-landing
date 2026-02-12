import { Business, Service } from "@/lib/types/business";
import { wellRoom } from "./well-room";

const businesses: Business[] = [wellRoom];

export function getAllBusinesses(): Business[] {
  return businesses;
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getAllBusinessSlugs(): string[] {
  return businesses.map((b) => b.slug);
}

export function getServiceBySlug(business: Business, serviceSlug: string): Service | undefined {
  return business.services.find((s) => s.slug === serviceSlug);
}
