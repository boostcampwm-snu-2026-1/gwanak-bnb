import {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
} from "@/components/ui/popover";

import RecommendationPopover from "./LocationRecommendationAutocomplete";
import SearchBar from "./SearchBar";
import { useLocationAutocomplete } from "@/hooks/useLocationAutocomplete";

const LocationSearchBar = () => {
  const {
    activeRecommendationIndex,
    handleQueryChange,
    handleQueryKeyDown,
    handleRecommendationSelect,
    query,
    recommendations,
  } = useLocationAutocomplete();

  return (
    <Popover>
      <PopoverAnchor asChild>
        <SearchBar
          inputSlot={
            <PopoverTrigger asChild>
              <input
                id="location-search-input"
                type="text"
                placeholder="여행지 검색"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleQueryKeyDown}
                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </PopoverTrigger>
          }
        />
      </PopoverAnchor>
      <RecommendationPopover
        activeIndex={activeRecommendationIndex}
        items={recommendations}
        onSelect={handleRecommendationSelect}
      />
    </Popover>
  );
};

export default LocationSearchBar;
