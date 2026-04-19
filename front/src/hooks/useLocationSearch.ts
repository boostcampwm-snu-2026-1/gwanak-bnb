import { useState, useRef, useEffect } from "react";
import { RECOMMENDED_LOCATIONS, ALL_LOCATIONS } from "@/constants/locations";

interface UseLocationSearchProps {
  value: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
}

export function useLocationSearch({ value, isOpen, onChange, onOpenChange }: UseLocationSearchProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredLocations = value.trim() === ""
    ? RECOMMENDED_LOCATIONS
    : ALL_LOCATIONS.filter(loc => 
        loc.name.toLowerCase().includes(value.toLowerCase()) ||
        loc.region.toLowerCase().includes(value.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredLocations.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev >= filteredLocations.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev <= 0 ? filteredLocations.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          const selected = filteredLocations[highlightedIndex];
          onChange(selected.name);
          onOpenChange(false);
        }
        break;
      case "Escape":
        onOpenChange(false);
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [value]);

  return {
    filteredLocations,
    highlightedIndex,
    setHighlightedIndex,
    listRef,
    handleKeyDown
  };
}