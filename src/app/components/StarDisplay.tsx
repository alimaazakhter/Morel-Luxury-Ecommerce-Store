import { Star } from "lucide-react";
import { stars } from "../utils/formatters";

export function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= stars(rating)
              ? "fill-amber-500 text-amber-500"
              : "fill-stone-200 text-stone-200"
          }
        />
      ))}
    </span>
  );
}
