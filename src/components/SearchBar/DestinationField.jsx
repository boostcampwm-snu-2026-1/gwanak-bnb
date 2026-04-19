// 여행지 탭 컴포넌트
// 검색어 입력, 추천/검색 드롭다운, 키보드 네비게이션을 통합 관리한다
//
// 키보드 동작:
//   ArrowDown/Up - 목록 순환 이동 (맨 끝에서 반대편으로)
//   이동 중에는 선택된 항목 이름이 입력창에 표시됨
//   Enter        - 강조된 항목 선택 (없으면 현재 쿼리로 확정)
//   Escape       - 드롭다운 닫기

import { useState, useEffect, useRef } from 'react'
import { RECOMMENDED_DESTINATIONS, ALL_DESTINATIONS } from '../../data/destinations'
import DestinationDropdown from './DestinationDropdown'

// 현재 쿼리에 따라 표시할 항목 목록을 반환
function getItems(query) {
  const trimmed = query.trim()
  if (!trimmed) return RECOMMENDED_DESTINATIONS
  return ALL_DESTINATIONS.filter(d =>
    d.name.toLowerCase().includes(trimmed.toLowerCase())
  )
}

// Props:
//   isOpen   - 드롭다운이 열려 있는지 (SearchBar에서 관리)
//   onToggle - 드롭다운 열림/닫힘 토글 (SearchBar로부터 전달)
//   onSelect - 목적지 선택 시 호출 (선택된 이름 전달)
export default function DestinationField({ isOpen, onToggle, onSelect }) {
  // 사용자가 타이핑한 검색어 (필터링 기준)
  const [query, setQuery] = useState('')
  // 키보드 네비게이션으로 강조된 항목 인덱스 (-1이면 없음)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // 드롭다운이 열릴 때 입력창에 포커스
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  // 드롭다운이 열려 있을 때 외부 클릭 감지 → 닫기
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onToggle(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  // 드롭다운이 닫힐 때 highlightedIndex 초기화
  useEffect(() => {
    if (!isOpen) setHighlightedIndex(-1)
  }, [isOpen])

  const items = getItems(query)

  // 표시값: 키보드 네비게이션 중이면 강조된 항목 이름, 아니면 사용자 입력 쿼리
  const displayValue = highlightedIndex >= 0 && items[highlightedIndex]
    ? items[highlightedIndex].name
    : query

  const handleItemSelect = (item) => {
    setQuery(item.name)
    setHighlightedIndex(-1)
    onToggle(false)
    onSelect?.(item.name)
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      // 맨 마지막에서 -1(입력창)으로 순환
      setHighlightedIndex(prev =>
        prev >= items.length - 1 ? -1 : prev + 1
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      // -1(입력창)에서 맨 마지막으로 순환
      setHighlightedIndex(prev =>
        prev <= -1 ? items.length - 1 : prev - 1
      )
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        handleItemSelect(items[highlightedIndex])
      } else {
        onToggle(false)
      }
    } else if (e.key === 'Escape') {
      onToggle(false)
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    // 타이핑 중에는 강조 초기화
    setHighlightedIndex(-1)
    if (!isOpen) onToggle(true)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setQuery('')
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }

  const handleFieldClick = () => {
    onToggle(prev => !prev)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full"
      onClick={handleFieldClick}
    >
      {/* 탭 내용 영역 */}
      <div className="flex items-center h-full px-6">
        <div className="flex flex-col flex-1 min-w-0">
          {/* 탭 레이블 */}
          <span className="text-xs font-semibold text-gray-900">여행지</span>

          {/* 입력창 또는 플레이스홀더 */}
          {isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={displayValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="여행지 검색"
              // bg-transparent으로 탭 배경과 통일
              className="text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400 mt-0.5 w-full"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className={`text-sm mt-0.5 truncate ${query ? 'text-gray-900' : 'text-gray-400'}`}>
              {query || '여행지 검색'}
            </span>
          )}
        </div>

        {/* X 초기화 버튼: 드롭다운이 열려 있고 쿼리가 있을 때만 표시 */}
        {isOpen && query && (
          <button
            onClick={handleClear}
            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center flex-shrink-0 ml-2 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <DestinationDropdown
          query={query}
          highlightedIndex={highlightedIndex}
          onSelect={handleItemSelect}
          onHighlight={setHighlightedIndex}
        />
      )}
    </div>
  )
}
