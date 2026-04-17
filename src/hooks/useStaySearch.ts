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

  searchParams.set("adult", String(guestFilter.adult));
  searchParams.set("children", String(guestFilter.kids));
  searchParams.set("infant", String(guestFilter.infant));
  searchParams.set("pets", String(guestFilter.pets));

  const response = await fetch(
    createApiUrl(`/api/stays/search?${searchParams.toString()}`)
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stay search results");
  }

  const payload = (await response.json()) as StaySearchResponse;

  return payload.data;
};

export const useStaySearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data = [], error, isFetching } = useQuery({
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
