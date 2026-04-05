// 여행자 탭 컴포넌트
// 인원(guests) 상태를 보유하고, 모달 열림/닫힘 및 초기화를 처리한다
// 모달 외부 클릭 감지는 useEffect + document 이벤트 리스너로 구현한다

import { useState, useEffect, useRef } from 'react'
import GuestModal from './GuestModal'

// 인원 초기값: 모든 카테고리 0명
const initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 }

// getSummary: 현재 인원을 사람이 읽기 좋은 요약 문자열로 변환
// - 성인+어린이를 합쳐 '게스트 N명'으로 표시
// - 항목이 3개 이상이면 앞 2개만 표시하고 ', ...' 로 생략
function getSummary(guests) {
  const totalPeople = guests.adults + guests.children
  const parts = []
  if (totalPeople > 0) parts.push(`게스트 ${totalPeople}명`)
  if (guests.infants > 0) parts.push(`유아 ${guests.infants}명`)
  if (guests.pets > 0) parts.push(`반려동물 ${guests.pets}마리`)
  // 3개 항목이 모두 선택된 경우 마지막 항목 생략
  if (parts.length > 2) return parts.slice(0, 2).join(', ') + ', ...'
  return parts.join(', ')
}

// Props:
//   isOpen  - 모달이 현재 열려 있는지 (SearchBar에서 관리)
//   onToggle - 모달 열림/닫힘 토글 함수 (SearchBar로부터 전달)
export default function GuestField({ isOpen, onToggle }) {
  // 인원 선택 상태: { adults, children, infants, pets }
  const [guests, setGuests] = useState(initialGuests)

  // 모달 외부 클릭을 감지하기 위한 컨테이너 ref
  const containerRef = useRef(null)

  // 모달이 열려 있을 때만 외부 클릭 이벤트 리스너를 등록
  // isOpen이 false가 되면 cleanup 함수로 리스너를 제거
  // → dependency 배열에 isOpen을 넣어 열릴/닫힐 때만 등록/해제
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      // 클릭 위치가 컨테이너 외부이면 모달 닫기
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onToggle(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    // cleanup: 컴포넌트 언마운트 또는 isOpen 변경 시 리스너 제거
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const summary = getSummary(guests)
  // 전체 인원 합계: X 초기화 버튼 표시 여부 판단에 사용
  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0)

  // X 버튼 클릭: 이벤트 버블링을 막아 모달이 닫히지 않도록 하고 인원 초기화
  const handleReset = (e) => {
    e.stopPropagation()
    setGuests(initialGuests)
  }

  return (
    <div ref={containerRef} className="relative flex-1 h-full flex items-center">

      {/* 탭 버튼: 클릭 시 모달 토글 */}
      <button
        onClick={() => onToggle(prev => !prev)}
        className="flex flex-col items-start px-6 h-16 justify-center text-left cursor-pointer flex-1"
      >
        {/* 탭 레이블 */}
        <span className="text-xs font-semibold text-gray-900">여행자</span>
        {/* 인원 요약 또는 플레이스홀더. truncate로 한 줄 유지 */}
        <span className={`text-sm mt-0.5 truncate ${summary ? 'text-gray-900' : 'text-gray-400'}`}>
          {summary || '게스트 추가'}
        </span>
      </button>

      {/* X 초기화 버튼: 모달이 열려 있고 1명 이상 선택된 경우에만 표시
          mr-[72px]: 확장된 검색 버튼(108px)에 가려지지 않을 위치에 배치 */}
      {isOpen && totalGuests > 0 && (
        <button
          onClick={handleReset}
          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center flex-shrink-0 mr-[72px] transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* 인원 선택 드롭다운 모달 */}
      {isOpen && <GuestModal guests={guests} onChange={setGuests} />}
    </div>
  )
}
