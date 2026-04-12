import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { disassemble } from "es-hangul";

import {
  DEFAULT_RECOMMENDATIONS,
  DUMMY_AUTOCOMPLETE_RECOMMENDATIONS,
} from "@/fixtures/data";
import type { RecommendedLocationItem } from "@/types";

const normalizeText = (value: string) => value.trim().toLowerCase();
const disassembleText = (value: string) => disassemble(normalizeText(value));

const includesAutocompleteQuery = (
  sourceText: string,
  normalizedQuery: string,
  disassembledQuery: string
) => {
  const normalizedSourceText = normalizeText(sourceText);

  return (
    normalizedSourceText.includes(normalizedQuery) ||
    disassembleText(sourceText).includes(disassembledQuery)
  );
};

const matchesRecommendation = (
  item: RecommendedLocationItem,
  normalizedQuery: string,
  disassembledQuery: string
) =>
  includesAutocompleteQuery(item.title, normalizedQuery, disassembledQuery) ||
  includesAutocompleteQuery(item.subtitle, normalizedQuery, disassembledQuery);

export const useLocationAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [typedQuery, setTypedQuery] = useState("");
  const [activeRecommendationIndex, setActiveRecommendationIndex] = useState<
    number | null
  >(null);
  const [recommendations, setRecommendations] = useState<
    readonly RecommendedLocationItem[]
  >(DEFAULT_RECOMMENDATIONS);

  useEffect(() => {
    const normalizedQuery = normalizeText(typedQuery);

    if (normalizedQuery === "") {
      setRecommendations(DEFAULT_RECOMMENDATIONS);
      setActiveRecommendationIndex(null);
      return;
    }

    const disassembledQuery = disassembleText(typedQuery);

    const newRecommendations = DUMMY_AUTOCOMPLETE_RECOMMENDATIONS.filter(
      (item) => matchesRecommendation(item, normalizedQuery, disassembledQuery)
    );

    setRecommendations(newRecommendations);
    setActiveRecommendationIndex(null);
  }, [typedQuery]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);
    setTypedQuery(nextQuery);
  };

  const handleRecommendationSelect = (title: string) => {
    setQuery(title);
    setTypedQuery(title);
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
