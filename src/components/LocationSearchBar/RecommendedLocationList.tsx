import type { RecommendedLocationItem } from "@/types";
import RecommendedLocationListItem from "./RecommendedLocationListItem";

interface RecommendedLocationListProps {
  activeIndex?: number | null;
  items: readonly RecommendedLocationItem[];
  onSelect?: (title: string) => void;
}

const RecommendedLocationList = ({
  activeIndex,
  items,
  onSelect,
}: RecommendedLocationListProps) => {
  if (items.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
        관련 여행지가 없습니다
      </div>
    );
  }

  return (
    <div className="grid gap-0.5 p-1.5">
      {items.map((item, index) => (
        <RecommendedLocationListItem
          key={item.title}
          icon={item.icon}
          isActive={activeIndex === index}
          title={item.title}
          subtitle={item.subtitle}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default RecommendedLocationList;
