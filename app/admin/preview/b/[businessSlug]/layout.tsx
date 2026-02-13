import { notFound } from "next/navigation";
import { getBusinessBySlugAdmin } from "@/data/businesses";

export const dynamic = "force-dynamic";

export default async function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlugAdmin(businessSlug);
  if (!business) notFound();

  return (
    <>
      <div className="bg-yellow-100 border-b border-yellow-300 px-4 py-2 text-center text-sm font-medium text-yellow-800">
        Admin Preview
      </div>
      <div className="min-h-screen bg-white font-wr-body font-light text-wr-text leading-[1.7] antialiased">
        {children}
      </div>
    </>
  );
}
