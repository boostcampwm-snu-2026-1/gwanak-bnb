import {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
} from "@/components/ui/popover";

import RecommendationPopover from "./LocationRecommendationPopover";
import SearchBar from "./SearchBar";
import { useLocationAutocomplete } from "@/hooks/useLocationAutocomplete";

const LocationSearchBar = () => {
  const { query, recommendations, setQuery } = useLocationAutocomplete();

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
                onChange={(event) => setQuery(event.target.value)}
                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </PopoverTrigger>
          }
        />
      </PopoverAnchor>
      <RecommendationPopover
        items={recommendations}
        onSelect={(title) => setQuery(title)}
      />
    </Popover>
  );
};

export default LocationSearchBar;
