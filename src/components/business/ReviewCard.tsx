import { Star } from "lucide-react";
import { Review } from "@/lib/types/business";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-wr-border rounded-xl p-5">
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? "fill-wr-copper text-wr-copper" : "text-wr-border"}
          />
        ))}
      </div>
      <p className="text-sm text-wr-text leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center justify-between text-xs text-wr-text-muted">
        <span className="font-medium text-wr-text-light">{review.author}</span>
        {review.source && <span>{review.source}</span>}
      </div>
    </div>
  );
}
