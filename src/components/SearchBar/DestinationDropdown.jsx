// 여행지 드롭다운 컴포넌트
// query가 없으면 추천 여행지 리스트를 노출하고,
// query가 있으면 필터링된 검색 결과를 노출한다

import { RECOMMENDED_DESTINATIONS, ALL_DESTINATIONS } from '../../data/destinations'

// ────────────────────────────────────────────────────────────
// 아이콘 컴포넌트들
// ────────────────────────────────────────────────────────────

// 추천 목적지 썸네일: 컬러 그라데이션 배경 + 아이콘
function RecommendedThumbnail({ color, icon }) {
  return (
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex-shrink-0 flex items-center justify-center`}>
      {icon === 'arrow' ? (
        // 근처 체험 찾기 - 위치 화살표 아이콘
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ) : (
        // 건물/랜드마크 아이콘
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="8" width="18" height="13" rx="1" />
          <path d="M8 21V12h8v9" />
          <path d="M9 8V5a3 3 0 016 0v3" />
        </svg>
      )}
    </div>
  )
}

// 검색 결과 아이콘: 회색 정사각형 + 위치 핀
function LocationIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
      </svg>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// DestinationDropdown
// Props:
//   query            - 현재 검색어
//   highlightedIndex - 키보드 네비게이션으로 선택된 인덱스 (-1이면 선택 없음)
//   onSelect         - 항목 클릭/엔터 시 호출 (item 객체 전달)
//   onHighlight      - 마우스 호버 시 highlightedIndex 갱신
// ────────────────────────────────────────────────────────────
export default function DestinationDropdown({ query, highlightedIndex, onSelect, onHighlight }) {
  const trimmed = query.trim()

  // 검색어가 있으면 ALL_DESTINATIONS를 필터링, 없으면 RECOMMENDED_DESTINATIONS 표시
  const isSearching = trimmed.length > 0
  const items = isSearching
    ? ALL_DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(trimmed.toLowerCase())
      )
    : RECOMMENDED_DESTINATIONS

  return (
    <div className="absolute top-[calc(100%+12px)] left-0 bg-white rounded-3xl shadow-xl py-6 w-[480px] z-50 max-h-[420px] overflow-y-auto">
      {/* 추천 여행지 헤더: 검색 중이 아닐 때만 표시 */}
      {!isSearching && (
        <h3 className="text-xs font-semibold text-gray-900 px-6 mb-3">추천 여행지</h3>
      )}

      {/* 항목 목록 */}
      {items.length === 0 ? (
        <p className="px-6 py-4 text-sm text-gray-400">검색 결과가 없습니다.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li
              key={item.id}
              onMouseEnter={() => onHighlight(index)}
              onMouseLeave={() => onHighlight(-1)}
              onClick={() => onSelect(item)}
              className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors ${
                highlightedIndex === index ? 'bg-gray-100' : ''
              }`}
            >
              {/* 썸네일 또는 위치 아이콘 */}
              {isSearching ? (
                <LocationIcon />
              ) : (
                <RecommendedThumbnail color={item.color} icon={item.icon} />
              )}

              {/* 텍스트 영역 */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-900 truncate">{item.name}</span>
                <span className="text-xs text-gray-500 mt-0.5 truncate">{item.subtitle}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
