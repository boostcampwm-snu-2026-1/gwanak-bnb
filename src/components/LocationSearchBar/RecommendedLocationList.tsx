import type { RecommendedLocationItem } from "@/types";
import RecommendedLocationListItem from "./RecommendedLocationListItem";

interface RecommendedLocationListProps {
  items: readonly RecommendedLocationItem[];
}

const RecommendedLocationList = ({ items }: RecommendedLocationListProps) => {
  return (
    <div className="grid gap-0.5 p-1.5">
      {items.map((item) => (
        <RecommendedLocationListItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}
    </div>
  );
};

export default RecommendedLocationList;
