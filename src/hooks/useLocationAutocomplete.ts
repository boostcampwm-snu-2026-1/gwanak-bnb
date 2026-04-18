import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";

import { createApiUrl } from "@/lib/api";
import { getLocationIcon } from "@/lib/location-icons";
import type { LocationSearchResponse, RecommendedLocationItem } from "@/types";

const mapRecommendations = (
  items: LocationSearchResponse["data"]
): RecommendedLocationItem[] =>
  items.map((item) => ({
    icon: getLocationIcon(item.iconKey),
    title: item.title,
    subtitle: item.subtitle,
  }));

export const useLocationAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [activeRecommendationIndex, setActiveRecommendationIndex] = useState<
    number | null
  >(null);
  const [recommendations, setRecommendations] = useState<
    readonly RecommendedLocationItem[]
  >([]);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        const searchParams = new URLSearchParams();
        const trimmedQuery = query.trim();

        if (trimmedQuery !== "") {
          searchParams.set("q", trimmedQuery);
        }

        const response = await fetch(
          createApiUrl(`/api/locations/search?${searchParams.toString()}`),
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location recommendations");
        }

        const payload = (await response.json()) as LocationSearchResponse;

        setRecommendations(mapRecommendations(payload.data));
        setActiveRecommendationIndex(null);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setRecommendations([]);
          setActiveRecommendationIndex(null);
        }
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);
    setActiveRecommendationIndex(null);
  };

  const handleRecommendationSelect = (title: string) => {
    setQuery(title);
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
