import { PopoverContent } from "@/components/ui/popover";

import RecommendedLocationList from "./RecommendedLocationList";
import type { RecommendedLocationItem } from "@/types";

interface RecommendationPopoverProps {
  items: readonly RecommendedLocationItem[];
  onSelect?: (title: string) => void;
}

const RecommendationPopover = ({
  items,
  onSelect,
}: RecommendationPopoverProps) => {
  return (
    <PopoverContent
      align="start"
      sideOffset={8}
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="w-[min(26rem,calc(100vw-1rem))] rounded-[1.5rem] border border-border/70 bg-background p-2 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.28)]"
    >
      <section className="overflow-hidden rounded-[1.1rem] bg-muted/35">
        <div className="border-b border-border/60 px-4 py-3 text-left">
          <span className="mt-0.5 text-base tracking-[-0.02em] text-foreground size-15">
            추천 여행지
          </span>
        </div>
        <div className="max-h-72 overflow-y-auto">
          <RecommendedLocationList items={items} onSelect={onSelect} />
        </div>
      </section>
    </PopoverContent>
  );
};

export default RecommendationPopover;
