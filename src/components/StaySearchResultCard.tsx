import { Star } from "lucide-react";

import type { StaySearchResult } from "@/types";

interface StaySearchResultCardProps {
  result: StaySearchResult;
}

export default function StaySearchResultCard({
  result,
}: StaySearchResultCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-background text-left shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]">
      <img
        src={result.image}
        alt={result.location}
        className="h-56 w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {result.location}
          </h2>
          <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
            <Star className="size-4 fill-current" />
            {result.rating.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          성인 최대 {result.maximumGuest.adult}명, 어린이 최대{" "}
          {result.maximumGuest.children}명
        </p>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-foreground">
            ₩{result.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground">
            {result.isPetAvailable
              ? "반려동물 동반 가능"
              : "반려동물 동반 불가"}
          </span>
        </div>
      </div>
    </article>
  );
}
