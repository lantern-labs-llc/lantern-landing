import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBusinessBySlug, getAllBusinessSlugs } from "@/data/businesses";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllBusinessSlugs();
  return slugs.map((slug) => ({ businessSlug: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}): Promise<Metadata> {
  const { businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug);
  if (!business) return {};

  return {
    icons: business.favicon ? { icon: business.favicon } : undefined,
  };
}

export default async function BusinessLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug);
  if (!business) notFound();

  return (
    <div className="min-h-screen bg-white font-wr-body font-light text-wr-text leading-[1.7] antialiased">
      {children}
    </div>
  );
}
