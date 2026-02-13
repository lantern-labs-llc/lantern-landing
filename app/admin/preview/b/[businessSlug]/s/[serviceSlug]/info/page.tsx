import { notFound } from "next/navigation";
import { getBusinessBySlugAdmin, getServiceBySlug } from "@/data/businesses";
import ServiceInfoContent from "@/components/business/ServiceInfoContent";

export default async function PreviewServiceInfo({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceSlug: string }>;
}) {
  const { businessSlug, serviceSlug } = await params;
  const business = await getBusinessBySlugAdmin(businessSlug);
  if (!business) notFound();
  const service = getServiceBySlug(business, serviceSlug);
  if (!service) notFound();

  return <ServiceInfoContent business={business} service={service} />;
}
