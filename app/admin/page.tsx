import { getAllBusinesses } from "@/data/businesses";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Admin — Lantern",
  robots: "noindex",
};

function PageLink({ label, slug, href }: { label: string; slug: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 text-sm px-3 py-2 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
    >
      <div className="min-w-0">
        <span className="block truncate">{label}</span>
        <span className="block text-[11px] font-mono text-muted-foreground truncate">{slug}</span>
      </div>
      <ExternalLink size={13} className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  );
}

export default function AdminPage() {
  const businesses = getAllBusinesses();

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl">Lantern Admin</h1>
            <p className="text-xs text-muted-foreground">Onboarded businesses</p>
          </div>
          <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            + New Customer
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {businesses.map((biz) => {
          const totalPages = 2 + biz.services.length * 2;

          return (
            <div key={biz.slug} className="border border-border rounded-xl bg-background p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <h2 className="font-display text-lg">{biz.name}</h2>
                  <p className="text-xs text-muted-foreground font-mono">/b/{biz.slug}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {totalPages} pages &middot; {biz.services.length} services
                </span>
              </div>

              {/* Business-level pages */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Business Pages</h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-5">
                <PageLink label="Landing Page" slug={`/b/${biz.slug}`} href={`/b/${biz.slug}`} />
                <PageLink label="Info Page" slug={`/b/${biz.slug}/info`} href={`/b/${biz.slug}/info`} />
              </div>

              {/* Service-level pages */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Service Pages</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {biz.services.map((s) => (
                  <div key={s.slug} className="contents">
                    <PageLink label={s.name} slug={`/b/${biz.slug}/s/${s.slug}`} href={`/b/${biz.slug}/s/${s.slug}`} />
                    <PageLink label={`${s.name} (info)`} slug={`/b/${biz.slug}/s/${s.slug}/info`} href={`/b/${biz.slug}/s/${s.slug}/info`} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {businesses.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No businesses onboarded yet.</p>
        )}
      </main>
    </div>
  );
}
