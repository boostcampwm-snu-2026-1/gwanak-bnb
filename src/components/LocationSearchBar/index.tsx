import {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ComponentProps } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import RecommendationPopover from "./LocationRecommendationAutocomplete";
import SearchBar from "./SearchBar";
import { useLocationAutocomplete } from "@/hooks/useLocationAutocomplete";

interface LocationSearchBarProps {
  onQueryChange?: (query: string) => void;
  query?: string;
  triggerClassName?: ComponentProps<typeof SearchBar>["className"];
}

const LocationSearchBar = ({
  onQueryChange,
  query: controlledQuery,
  triggerClassName,
}: LocationSearchBarProps) => {
  const {
    activeRecommendationIndex,
    handleQueryChange,
    handleQueryKeyDown,
    handleRecommendationSelect,
    query: internalQuery,
    recommendations,
  } = useLocationAutocomplete();
  const query = controlledQuery ?? internalQuery;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(event);
    onQueryChange?.(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    handleQueryKeyDown(event);
  };

  const onSelect = (title: string) => {
    handleRecommendationSelect(title);
    onQueryChange?.(title);
  };

  return (
    <Popover>
      <PopoverAnchor asChild>
        <SearchBar
          className={triggerClassName}
          inputSlot={
            <PopoverTrigger asChild>
              <input
                id="location-search-input"
                type="text"
                placeholder="여행지 검색"
                value={query}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </PopoverTrigger>
          }
        />
      </PopoverAnchor>
      <RecommendationPopover
        activeIndex={activeRecommendationIndex}
        items={recommendations}
        onSelect={onSelect}
      />
    </Popover>
  );
};

export default LocationSearchBar;
