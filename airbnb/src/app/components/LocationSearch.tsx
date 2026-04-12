"use client"

import { useState, useRef, useEffect } from "react"

interface Location {
  id: string
  name: string
  region: string
  type: "city" | "attraction" | "area"
}

const RECOMMENDED_LOCATIONS: Location[] = [
  { id: "nearby", name: "근처 체험 찾기", region: "가까운 곳에서 수 있는 체험을 찾아보세요", type: "area" },
  { id: "gwanak", name: "관악산국립공원", region: "대한민국 · 서울 · 관악", type: "attraction" },
  { id: "osaka", name: "오사카시, 일본", region: "일본 · 오사카", type: "city" },
  { id: "busan", name: "부산, 부산", region: "해운대와 다이아몬드타워로 유명한 곳", type: "city" },
  { id: "jeju", name: "제주", region: "자연을 만끽하기 좋은 곳", type: "city" },
  { id: "sokcho", name: "속초시, 강원도", region: "동주로 인기 있는 곳", type: "city" },
  { id: "gangneung", name: "강릉시, 강원도", region: "해변이 아름다운 동해안 도시", type: "city" },
]

const ALL_LOCATIONS: Location[] = [
  ...RECOMMENDED_LOCATIONS,
  { id: "yeosu", name: "여수시", region: "대한민국 · 전라남도 · 도시", type: "city" },
  { id: "yeosu-admiral", name: "이순신광장", region: "대한민국 · 전라남도 · 여수시 · 공원", type: "attraction" },
  { id: "yeosu-yacht", name: "여수 해돋이요트투어 앤 스위트", region: "대한민국 · 전라남도 · 여수시 · 숙박시설", type: "attraction" },
  { id: "yeosu-market", name: "여수시장", region: "대한민국 · 전라남도 · 여수시", type: "attraction" },
  { id: "odongdo", name: "오동도", region: "대한민국 · 전라남도 · 여수시 · 지역", type: "area" },
  { id: "seoul", name: "서울", region: "대한민국 · 수도", type: "city" },
  { id: "tokyo", name: "도쿄", region: "일본 · 수도", type: "city" },
  { id: "bangkok", name: "방콕", region: "태국 · 수도", type: "city" },
]

interface LocationSearchProps {
  value: string
  onChange: (value: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function LocationSearch({ value, onChange, isOpen, onOpenChange }: LocationSearchProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filteredLocations = value.trim() === ""
    ? RECOMMENDED_LOCATIONS
    : ALL_LOCATIONS.filter(loc => 
        loc.name.toLowerCase().includes(value.toLowerCase()) ||
        loc.region.toLowerCase().includes(value.toLowerCase())
      )

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredLocations.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev >= filteredLocations.length - 1 ? 0 : prev + 1
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev <= 0 ? filteredLocations.length - 1 : prev - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0) {
          const selected = filteredLocations[highlightedIndex]
          onChange(selected.name)
          onOpenChange(false)
        }
        break
      case "Escape":
        onOpenChange(false)
        break
    }
  }

  // 하이라이트된 항목이 보이도록 스크롤
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement
      item?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex])

  // 검색어 변경 시 하이라이트 초기화
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [value])

  const getIcon = (type: Location["type"]) => {
    if (type === "area") {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    }
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  }

  return (
    <div className="relative">
      {/* 입력 필드 */}
      <div 
        className={`px-6 py-4 cursor-pointer rounded-full transition-colors ${isOpen ? "bg-white shadow-md" : "hover:bg-gray-50"}`}
        onClick={() => {
          onOpenChange(true)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
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
          <ul ref={listRef} className="max-h-80 overflow-y-auto">
            {filteredLocations.length === 0 ? (
              <li className="px-6 py-3 text-sm text-gray-500">검색 결과가 없습니다</li>
            ) : (
              filteredLocations.map((location, index) => (
                <li
                  key={location.id}
                  className={`px-6 py-3 flex items-center gap-4 cursor-pointer transition-colors ${
                    highlightedIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onChange(location.name)
                    onOpenChange(false)
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    {getIcon(location.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#222] truncate">{location.name}</p>
                    <p className="text-xs text-gray-500 truncate">{location.region}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
