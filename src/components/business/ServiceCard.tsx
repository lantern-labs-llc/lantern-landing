import { Service } from "@/lib/types/business";

export default function ServiceCard({
  service,
  bookingUrl,
}: {
  service: Service;
  bookingUrl?: string;
}) {
  const href = service.bookingUrl ?? bookingUrl;

  return (
    <div className="bg-wr-white border border-wr-border rounded-[2px] p-6 flex flex-col transition-colors duration-200 hover:border-wr-copper-light">
      <div className="font-wr-heading text-[1.15rem] font-medium text-wr-text mb-1.5">
        {service.name}
      </div>
      <div className="text-[0.82rem] text-wr-text-muted leading-[1.5] mb-auto pb-4">
        {service.shortDescription}
      </div>
      {service.price && (
        <div className="text-[0.85rem] text-wr-text-light mb-3">
          {service.price}
        </div>
      )}
      {href && (
        <a
          href={href}
          className="self-start font-wr-body text-[0.78rem] font-normal uppercase tracking-[0.1em] text-wr-copper-dark no-underline border-b border-wr-copper-light pb-px transition-colors duration-200 hover:text-wr-copper"
        >
          Book {service.name} →
        </a>
      )}
    </div>
  );
}
