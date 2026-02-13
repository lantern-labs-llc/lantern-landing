import { notFound } from "next/navigation";
import { getBusinessBySlugAdmin, getServiceBySlug } from "@/data/businesses";
import ServiceLandingClient from "../../../../../../b/[businessSlug]/s/[serviceSlug]/ServiceLandingClient";

export default async function PreviewServiceLP({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}) {
  const { businessSlug, serviceSlug } = await params;
  const business = await getBusinessBySlugAdmin(businessSlug);
  if (!business) notFound();
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) notFound();

  return <ServiceLandingClient business={business} service={service} />;
}
