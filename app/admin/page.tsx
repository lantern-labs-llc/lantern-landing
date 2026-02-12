import { getAllBusinesses } from "@/data/businesses";
import BusinessCard from "./BusinessCard";

export const metadata = {
  title: "Admin — Lantern",
  robots: "noindex",
};

export default function AdminPage() {
  const businesses = getAllBusinesses();

  return (
    <div className="min-h-screen bg-[hsl(var(--lantern-warm))] font-sans text-foreground">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl">Lantern Admin</h1>
            <p className="text-xs text-muted-foreground">{businesses.length} onboarded {businesses.length === 1 ? "business" : "businesses"}</p>
          </div>
          <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            + New Customer
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
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
