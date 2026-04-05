// 검색 바 전체 레이아웃 컴포넌트
// 여행지 / 날짜 / 여행자 세 탭과 검색 버튼을 포함한다
// 호버 상태와 여행자 모달 열림 여부를 여기서 통합 관리한다

import { useState } from 'react'
import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField/GuestField'

// ────────────────────────────────────────────────────────────
// SearchButton: 우측 빨간 검색 버튼
// isOpen이 true(여행자 탭 활성화)일 때 버튼이 좌측으로 확장되며 '검색' 텍스트가 페이드인된다
// ────────────────────────────────────────────────────────────
function SearchButton({ isOpen }) {
  return (
    // 레이아웃 공간은 항상 w-12로 고정 유지
    // 실제 버튼은 absolute로 우측에 고정되어 좌측 방향으로만 확장됨
    <div className="relative w-12 h-12 flex-shrink-0 mr-2">
      <button
        className={`
          absolute right-0 top-0 h-12
          bg-[#FF385C] rounded-full overflow-hidden
          flex items-center pl-4
          text-white hover:bg-[#e0314f] cursor-pointer
          transition-[width] duration-300 ease-in-out
          ${isOpen ? 'w-[108px]' : 'w-12'}
        `}
      >
        {/* 돋보기 아이콘: 버튼 왼쪽 고정(pl-4), 버튼 확장 시 같은 속도로 이동 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>

        {/* '검색' 텍스트: max-width와 opacity를 함께 전환해 자연스러운 페이드인 구현
            - 열릴 때: 250ms 딜레이 후 200ms 동안 페이드인
            - 닫힐 때: 즉시 150ms 동안 페이드아웃 */}
        <span
          className={`
            text-sm font-semibold whitespace-nowrap overflow-hidden
            transition-[max-width,opacity,margin] ease-in-out
            ${isOpen
              ? 'max-w-[80px] opacity-100 ml-2 duration-200 delay-[250ms]'
              : 'max-w-0 opacity-0 ml-0 duration-150 delay-0'
            }
          `}
        >
          검색
        </span>
      </button>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Divider: 탭 사이의 세로 구분선
// 인접한 탭이 호버/활성 상태일 때 opacity를 0으로 전환하여 자연스럽게 숨긴다
// ────────────────────────────────────────────────────────────
function Divider({ hidden }) {
  return (
    <div
      className={`w-px h-8 bg-gray-200 flex-shrink-0 transition-opacity duration-150 ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
    />
  )
}

// ────────────────────────────────────────────────────────────
// SearchBar: 루트 검색 바 컴포넌트
// ────────────────────────────────────────────────────────────
export default function SearchBar() {
  // 여행자 모달이 열려 있는지 여부
  const [guestOpen, setGuestOpen] = useState(false)
  // 현재 마우스가 올라간 탭 이름 ('destination' | 'date' | 'guest' | null)
  const [hovered, setHovered] = useState(null)

  // 구분선 숨김 여부: 인접한 두 탭 중 하나라도 호버/활성이면 숨김
  const divider1Hidden = hovered === 'destination' || hovered === 'date'
  const divider2Hidden = hovered === 'date' || hovered === 'guest' || guestOpen

  // 탭 공통 스타일: 세 탭 모두 동일한 flex-1 래퍼로 감싸 대칭 레이아웃 보장
  // 호버 시 회색 pill 배경 적용 (모달 열린 상태에서는 여행자 탭에 배경 미적용)
  const tabClass = (name) =>
    `flex-1 flex items-center rounded-full h-full transition-colors cursor-pointer ${
      hovered === name && !(name === 'guest' && guestOpen) ? 'bg-gray-100' : ''
    }`

  return (
    <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-md h-16 w-full max-w-3xl">

      {/* 여행지 탭 */}
      <div
        className={tabClass('destination')}
        onMouseEnter={() => setHovered('destination')}
        onMouseLeave={() => setHovered(null)}
      >
        <DestinationField />
      </div>

      {/* 탭 구분선 1: 여행지-날짜 사이 */}
      <Divider hidden={divider1Hidden} />

      {/* 날짜 탭 */}
      <div
        className={tabClass('date')}
        onMouseEnter={() => setHovered('date')}
        onMouseLeave={() => setHovered(null)}
      >
        <DateField />
      </div>

      {/* 탭 구분선 2: 날짜-여행자 사이 */}
      <Divider hidden={divider2Hidden} />

      {/* 여행자 탭 + 검색 버튼을 하나의 호버 영역으로 묶음
          hover 배경이 검색 버튼까지 포함하도록 같은 wrapper 안에 배치 */}
      <div
        className={tabClass('guest')}
        onMouseEnter={() => setHovered('guest')}
        onMouseLeave={() => setHovered(null)}
      >
        <GuestField isOpen={guestOpen} onToggle={setGuestOpen} />
        <SearchButton isOpen={guestOpen} />
      </div>

    </div>
  )
}
