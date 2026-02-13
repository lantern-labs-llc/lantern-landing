import { notFound } from "next/navigation";
import { getBusinessBySlugAdmin } from "@/data/businesses";
import BusinessLandingClient from "../../../../b/[businessSlug]/BusinessLandingClient";

export default async function PreviewBusinessLP({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlugAdmin(businessSlug);
  if (!business) notFound();

  return <BusinessLandingClient business={business} />;
}
