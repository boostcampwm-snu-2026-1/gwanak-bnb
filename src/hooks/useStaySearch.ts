import { useState } from "react";

import { STAY_SEARCH_RESULTS } from "@/fixtures/data";
import type { GuestFilter, StaySearchResult } from "@/types";

interface SearchParams {
  location: string;
  guestFilter: GuestFilter;
}

const matchesLocation = (result: StaySearchResult, location: string) =>
  location.trim() === "" ||
  result.location.toLowerCase().includes(location.trim().toLowerCase());

const matchesGuestFilter = (
  result: StaySearchResult,
  guestFilter: GuestFilter
) => {
  const adultsRequested = guestFilter.adult;
  const childrenRequested = guestFilter.kids;

  if (adultsRequested > result.maximumGuest.adult) {
    return false;
  }

  if (childrenRequested > result.maximumGuest.children) {
    return false;
  }

  if (guestFilter.pets > 0 && !result.isPetAvailable) {
    return false;
  }

  return true;
};

export const useStaySearch = () => {
  const [results, setResults] = useState<StaySearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const search = ({ location, guestFilter }: SearchParams) => {
    const nextResults = STAY_SEARCH_RESULTS.filter(
      (result) =>
        matchesLocation(result, location) &&
        matchesGuestFilter(result, guestFilter)
    );

    setResults(nextResults);
    setHasSearched(true);
  };

  return {
    hasSearched,
    results,
    search,
  };
};
