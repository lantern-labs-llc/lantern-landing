import { notFound } from "next/navigation";
import { getBusinessBySlugAdmin } from "@/data/businesses";
import BusinessInfoContent from "@/components/business/BusinessInfoContent";

export default async function PreviewBusinessInfo({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlugAdmin(businessSlug);
  if (!business) notFound();

  return <BusinessInfoContent business={business} />;
}
