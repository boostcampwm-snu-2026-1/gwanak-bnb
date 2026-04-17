import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

const getStaySearchResults = ({ location, guestFilter }: SearchParams) =>
  STAY_SEARCH_RESULTS.filter(
    (result) =>
      matchesLocation(result, location) &&
      matchesGuestFilter(result, guestFilter)
  );

export const useStaySearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data = [], isFetching } = useQuery({
    queryKey: ["stay-search-results", searchParams],
    queryFn: () => getStaySearchResults(searchParams as SearchParams),
    enabled: searchParams !== null,
  });

  return {
    hasSearched: searchParams !== null,
    isFetching,
    results: data,
    search: setSearchParams,
  };
};
