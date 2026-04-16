import { IAccommodation } from "@/types/accommodation";
import AccommodationCard from "./AccommodationCard";

interface SearchResultProps {
  accommodations: IAccommodation[];
  hasSearched: boolean;
}

export default function SearchResult({ accommodations, hasSearched }: SearchResultProps) {
  if (!hasSearched) return null;

  if (accommodations.length === 0) {
    return (
      <div className="w-full text-center py-20 text-muted">
        조건에 맞는 숙소가 없습니다. 다른 조건으로 검색해보세요.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-12 border-t border-gray-200">
      <h2 className="text-2xl font-semibold mb-6">
        총 {accommodations.length}개의 숙소를 찾았습니다
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accommodations.map((item) => (
          <AccommodationCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
