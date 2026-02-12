import { MapPin, Phone, Globe } from "lucide-react";
import { Business } from "@/lib/types/business";

export default function ContactInfo({ business }: { business: Business }) {
  const mapQuery = encodeURIComponent(
    `${business.address}, ${business.city}, ${business.state} ${business.zip}`
  );

  return (
    <div className="space-y-3 text-sm">
      <a
        href={`https://maps.google.com/?q=${mapQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 text-wr-text-light hover:text-wr-text transition-colors"
      >
        <MapPin size={16} className="mt-0.5 shrink-0 text-wr-copper" />
        <span>
          {business.address}<br />
          {business.city}, {business.state} {business.zip}
        </span>
      </a>
      <a
        href={`tel:${business.phone}`}
        className="flex items-center gap-3 text-wr-text-light hover:text-wr-text transition-colors"
      >
        <Phone size={16} className="shrink-0 text-wr-copper" />
        {business.phone}
      </a>
      {business.website && (
        <a
          href={business.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-wr-text-light hover:text-wr-text transition-colors"
        >
          <Globe size={16} className="shrink-0 text-wr-copper" />
          {business.website.replace(/^https?:\/\//, "")}
        </a>
      )}
    </div>
  );
}
