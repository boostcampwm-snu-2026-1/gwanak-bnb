"use client"

import { useRef } from "react";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { LocationListItem } from "./LocationListItem";

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationSearch({ value, onChange, isOpen, onOpenChange }: LocationSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    filteredLocations,
    highlightedIndex,
    setHighlightedIndex,
    listRef,
    handleKeyDown
  } = useLocationSearch({ value, isOpen, onChange, onOpenChange });

  return (
    <div className="relative">
      {/* 입력 필드 */}
      <div 
        className={`px-6 py-4 cursor-pointer rounded-full transition-colors ${isOpen ? "bg-white shadow-md" : "hover:bg-gray-50"}`}
        onClick={() => {
          onOpenChange(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        aria-expanded={isOpen}
      >
        <p className="text-xs font-semibold text-[#222]">여행지</p>
        {isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="여행지 검색"
            className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400"
            autoFocus
          />
        ) : (
          <p className={`text-sm ${value ? "text-[#222]" : "text-gray-400"}`}>
            {value || "여행지 검색"}
          </p>
        )}
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[400px] bg-white rounded-3xl shadow-xl border border-gray-200 py-4 z-50">
          <p className="px-6 py-2 text-sm font-semibold text-[#222]">
            {value ? "검색 결과" : "추천 여행지"}
          </p>
          <ul ref={listRef} className="max-h-80 overflow-y-auto" role="listbox">
            {filteredLocations.length === 0 ? (
              <li className="px-6 py-3 text-sm text-gray-500">검색 결과가 없습니다</li>
            ) : (
              filteredLocations.map((location, index) => (
                <LocationListItem
                  key={location.id}
                  location={location}
                  isHighlighted={highlightedIndex === index}
                  onClick={() => {
                    onChange(location.name);
                    onOpenChange(false);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}