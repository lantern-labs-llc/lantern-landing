import { Business } from "@/lib/types/business";

function getHoursSummary(business: Business): string {
  const openDays = business.hours.filter((h) => !h.closed);
  if (openDays.length === 0) return "";
  const first = openDays[0];
  const last = openDays[openDays.length - 1];
  const dayRange =
    first.day === last.day
      ? first.day
      : `${first.day.slice(0, 3)}–${last.day.slice(0, 3)}`;
  return `${dayRange} ${first.open}–${first.close}`;
}

export default function PageFooter({ business }: { business: Business }) {
  const hoursSummary = getHoursSummary(business);

  return (
    <footer className="border-t border-wr-border py-7 text-center max-[600px]:pb-20">
      <div className="max-w-[600px] mx-auto px-6">
        <div className="text-[0.85rem] text-wr-text-light mb-1">
          <a
            href={business.website ?? "#"}
            className="text-wr-copper-dark no-underline"
          >
            {business.name}
          </a>
          {" · "}
          {business.city}, {business.state}
        </div>
        <div className="text-[0.8rem] text-wr-text-muted mb-4">
          {business.address}
          {hoursSummary && ` · ${hoursSummary}`}
          {business.parking && ` · ${business.parking}`}
        </div>
        <div className="text-[0.72rem] text-wr-text-muted tracking-[0.04em]">
          Powered by{" "}
          <a
            href="https://lantern.llc"
            className="text-wr-text-muted no-underline border-b border-wr-border"
          >
            Lantern
          </a>
        </div>
      </div>
    </footer>
  );
}
