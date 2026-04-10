import { useEffect, useState } from "react";
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
  const [recommendations, setRecommendations] = useState<
    readonly RecommendedLocationItem[]
  >(DEFAULT_RECOMMENDATIONS);

  useEffect(() => {
    const normalizedQuery = normalizeText(query);

    if (normalizedQuery === "") {
      setRecommendations(DEFAULT_RECOMMENDATIONS);
      return;
    }

    const disassembledQuery = disassembleText(query);

    const newRecommendations = DUMMY_AUTOCOMPLETE_RECOMMENDATIONS.filter(
      (item) => matchesRecommendation(item, normalizedQuery, disassembledQuery)
    );

    setRecommendations(
      newRecommendations.length > 0
        ? newRecommendations
        : DUMMY_AUTOCOMPLETE_RECOMMENDATIONS
    );
  }, [query]);

  return {
    query,
    recommendations,
    setQuery,
  };
};
