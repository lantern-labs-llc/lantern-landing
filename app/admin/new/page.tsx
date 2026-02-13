import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PlaceSearch from "./PlaceSearch";

export const metadata = {
  title: "New Customer — Lantern Admin",
  robots: "noindex",
};

export default function NewCustomerPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--lantern-warm))] font-sans text-foreground">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            href="/admin"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-display text-xl">New Customer</h1>
            <p className="text-xs text-muted-foreground">
              Search for a business on Google
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <PlaceSearch />
      </main>
    </div>
  );
}
