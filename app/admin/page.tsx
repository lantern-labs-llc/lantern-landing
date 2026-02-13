import Link from "next/link";
import { getAllBusinessesAdmin } from "@/data/businesses";
import BusinessCard from "./BusinessCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Lantern",
  robots: "noindex",
};

function StatBox({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="bg-background border border-border rounded-lg px-4 py-3 min-w-0">
      <div className={`text-2xl font-semibold ${color}`}>{count}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default async function AdminPage() {
  const businesses = await getAllBusinessesAdmin();

  const demoCount = businesses.filter((b) => b.status === "demo").length;
  const activeCount = businesses.filter((b) => b.status === "active").length;

  let draftPages = 0;
  let publishedPages = 0;
  for (const biz of businesses) {
    if (biz.lpStatus === "draft") draftPages++;
    else if (biz.lpStatus === "published") publishedPages++;
    if (biz.infoStatus === "draft") draftPages++;
    else if (biz.infoStatus === "published") publishedPages++;
    for (const svc of biz.services) {
      if (svc.lpStatus === "draft") draftPages++;
      else if (svc.lpStatus === "published") publishedPages++;
      if (svc.infoStatus === "draft") draftPages++;
      else if (svc.infoStatus === "published") publishedPages++;
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--lantern-warm))] font-sans text-foreground">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl">Lantern Admin</h1>
          <Link
            href="/admin/new"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Business
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Businesses</div>
            <div className="grid grid-cols-2 gap-3">
              <StatBox label="Demo" count={demoCount} color="text-blue-600" />
              <StatBox label="Active" count={activeCount} color="text-green-600" />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pages</div>
            <div className="grid grid-cols-2 gap-3">
              <StatBox label="Draft" count={draftPages} color="text-yellow-600" />
              <StatBox label="Published" count={publishedPages} color="text-green-600" />
            </div>
          </div>
        </div>

        {businesses.map((biz) => (
          <BusinessCard key={biz.slug} biz={biz} />
        ))}

        {businesses.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No businesses onboarded yet.</p>
        )}
      </main>
    </div>
  );
}
