import { BusinessHours } from "@/lib/types/business";

export default function HoursTable({ hours }: { hours: BusinessHours[] }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className="border-b border-wr-border/50 last:border-0">
            <td className="py-2.5 font-medium text-wr-text w-28">{h.day}</td>
            <td className="py-2.5 text-wr-text-light">
              {h.closed ? <span className="text-wr-text-muted">Closed</span> : `${h.open} \u2013 ${h.close}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
