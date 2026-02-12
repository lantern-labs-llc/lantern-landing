import { Business } from "@/lib/types/business";

export default function BusinessFooter({ business }: { business: Business }) {
  return (
    <footer className="border-t border-wr-border bg-wr-cream px-5 py-10">
      <div className="max-w-[740px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <p className="font-wr-heading text-xl text-wr-text mb-1">{business.name}</p>
            <address className="not-italic text-sm text-wr-text-light leading-relaxed">
              {business.address}<br />
              {business.city}, {business.state} {business.zip}
            </address>
          </div>
          <div className="text-sm text-wr-text-light space-y-1">
            <p><a href={`tel:${business.phone}`} className="hover:text-wr-copper transition-colors">{business.phone}</a></p>
            {business.website && (
              <p>
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:text-wr-copper transition-colors">
                  {business.website.replace(/^https?:\/\//, "")}
                </a>
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-wr-border pt-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-wr-text-muted">
          <p>&copy; {new Date().getFullYear()} {business.name}</p>
          <p>
            Powered by{" "}
            <a href="/" className="text-wr-copper hover:text-wr-copper-dark transition-colors">Lantern</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
