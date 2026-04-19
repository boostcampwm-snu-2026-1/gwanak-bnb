import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { createApiUrl } from "@/lib/api";
import type {
  GuestFilter,
  StaySearchResponse,
  StaySearchResult,
} from "@/types";

interface SearchParams {
  location: string;
  guestFilter: GuestFilter;
}

const getStaySearchResults = async ({
  location,
  guestFilter,
}: SearchParams): Promise<StaySearchResult[]> => {
  const searchParams = new URLSearchParams();

  if (location.trim() !== "") {
    searchParams.set("location", location.trim());
  }

  if (guestFilter.adult > 0) {
    searchParams.set("adult", String(guestFilter.adult));
  }

  if (guestFilter.kids > 0) {
    searchParams.set("children", String(guestFilter.kids));
  }

  if (guestFilter.infant > 0) {
    searchParams.set("infant", String(guestFilter.infant));
  }

  if (guestFilter.pets > 0) {
    searchParams.set("pets", String(guestFilter.pets));
  }

  const queryString = searchParams.toString();
  const requestPath =
    queryString === ""
      ? "/api/stays/search"
      : `/api/stays/search?${queryString}`;

  const response = await fetch(createApiUrl(requestPath));

  if (!response.ok) {
    throw new Error("Failed to fetch stay search results");
  }

  const payload = (await response.json()) as StaySearchResponse;

  return payload.data;
};

export const useStaySearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const {
    data = [],
    error,
    isFetching,
  } = useQuery({
    queryKey: ["stay-search-results", searchParams],
    queryFn: () => getStaySearchResults(searchParams as SearchParams),
    enabled: searchParams !== null,
  });

  return {
    error,
    hasSearched: searchParams !== null,
    isFetching,
    results: data,
    search: setSearchParams,
  };
};
