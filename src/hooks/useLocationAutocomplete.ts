import { disassemble } from "es-hangul";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";

import {
  DEFAULT_RECOMMENDATIONS,
  DUMMY_AUTOCOMPLETE_RECOMMENDATIONS,
} from "@/fixtures/data";
import type { RecommendedLocationItem } from "@/types";

const ALL_RECOMMENDATIONS: readonly RecommendedLocationItem[] = [
  ...DEFAULT_RECOMMENDATIONS,
  ...DUMMY_AUTOCOMPLETE_RECOMMENDATIONS,
];

const normalizeText = (value: string) => value.trim().toLowerCase();
const disassembleText = (value: string) => disassemble(normalizeText(value));

const includesQuery = (source: string, query: string) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const normalizedSource = normalizeText(source);

  return (
    normalizedSource.includes(normalizedQuery) ||
    disassembleText(source).includes(disassembleText(query))
  );
};

const filterRecommendations = (query: string) => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return DEFAULT_RECOMMENDATIONS;
  }

  return ALL_RECOMMENDATIONS.filter(
    ({ title, subtitle }) =>
      includesQuery(title, normalizedQuery) ||
      includesQuery(subtitle, normalizedQuery)
  );
};

export const useLocationAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [activeRecommendationIndex, setActiveRecommendationIndex] = useState<
    number | null
  >(null);
  const [recommendations, setRecommendations] = useState<
    readonly RecommendedLocationItem[]
  >(DEFAULT_RECOMMENDATIONS);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);
    setRecommendations(filterRecommendations(nextQuery));
    setActiveRecommendationIndex(null);
  };

  const handleRecommendationSelect = (title: string) => {
    setQuery(title);
    setRecommendations(filterRecommendations(title));
    setActiveRecommendationIndex(null);
  };

  const handleQueryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (recommendations.length === 0) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const fallbackIndex = direction === 1 ? -1 : 0;
      const nextIndex =
        (((activeRecommendationIndex ?? fallbackIndex) + direction) %
          recommendations.length +
          recommendations.length) %
        recommendations.length;

      setActiveRecommendationIndex(nextIndex);
      setQuery(recommendations[nextIndex].title);
      return;
    }

    if (event.key === "Enter" && activeRecommendationIndex !== null) {
      event.preventDefault();
      handleRecommendationSelect(recommendations[activeRecommendationIndex].title);
    }
  };

  return {
    activeRecommendationIndex,
    handleQueryChange,
    handleQueryKeyDown,
    handleRecommendationSelect,
    query,
    recommendations,
  };
};
