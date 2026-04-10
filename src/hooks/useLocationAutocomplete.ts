import { useEffect, useState } from "react";

import {
  DEFAULT_RECOMMENDATIONS,
  DUMMY_AUTOCOMPLETE_RECOMMENDATIONS,
} from "@/fixtures/data";
import type { RecommendedLocationItem } from "@/types";

const AUTOCOMPLETE_MIN_QUERY_LENGTH = 2;
const AUTOCOMPLETE_DEBOUNCE_MS = 180;

const normalizeQuery = (value: string) => value.trim().toLowerCase();

const matchesRecommendation = (
  item: RecommendedLocationItem,
  normalizedQuery: string
) =>
  item.title.toLowerCase().includes(normalizedQuery) ||
  item.subtitle.toLowerCase().includes(normalizedQuery);

export const useLocationAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<
    readonly RecommendedLocationItem[]
  >(DEFAULT_RECOMMENDATIONS);

  useEffect(() => {
    const normalizedQuery = normalizeQuery(query);

    if (normalizedQuery.length < AUTOCOMPLETE_MIN_QUERY_LENGTH) {
      setRecommendations(DEFAULT_RECOMMENDATIONS);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const matchedRecommendations = DUMMY_AUTOCOMPLETE_RECOMMENDATIONS.filter(
        (item) => matchesRecommendation(item, normalizedQuery)
      );

      setRecommendations(
        matchedRecommendations.length > 0
          ? matchedRecommendations
          : DUMMY_AUTOCOMPLETE_RECOMMENDATIONS
      );
    }, AUTOCOMPLETE_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    recommendations,
    setQuery,
  };
};
