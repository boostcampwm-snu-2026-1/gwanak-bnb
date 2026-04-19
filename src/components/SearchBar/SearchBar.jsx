// 검색 바 전체 레이아웃 컴포넌트
// 여행지 / 날짜 / 여행자 세 탭과 검색 버튼을 포함한다
// 호버 상태, 드롭다운 열림 여부, 여행지/인원 상태를 여기서 통합 관리한다

import { useState } from 'react'
import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField/GuestField'

const initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 }

// ────────────────────────────────────────────────────────────
// SearchButton: 우측 빨간 검색 버튼
// ────────────────────────────────────────────────────────────
function SearchButton({ isOpen, onClick }) {
  return (
    <div className="relative w-12 h-12 flex-shrink-0 mr-2">
      <button
        onClick={onClick}
        className={`
          absolute right-0 top-0 h-12
          bg-[#FF385C] rounded-full overflow-hidden
          flex items-center pl-4
          text-white hover:bg-[#e0314f] cursor-pointer
          transition-[width] duration-300 ease-in-out
          ${isOpen ? 'w-[108px]' : 'w-12'}
        `}
      >
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
// SearchBar
// Props:
//   onSearch - 검색 버튼 클릭 시 { destination, guests } 전달
// ────────────────────────────────────────────────────────────
export default function SearchBar({ onSearch }) {
  const [destinationOpen, setDestinationOpen] = useState(false)
  const [guestOpen, setGuestOpen] = useState(false)
  const [hovered, setHovered] = useState(null)

  // 검색 조건 상태 (검색 버튼 클릭 시 onSearch로 전달)
  const [destination, setDestination] = useState('')
  const [guests, setGuests] = useState(initialGuests)

  const divider1Hidden = hovered === 'destination' || hovered === 'date' || destinationOpen
  const divider2Hidden = hovered === 'date' || hovered === 'guest' || guestOpen

  const tabClass = (name) =>
    `flex-1 flex items-center rounded-full h-full transition-colors cursor-pointer ${
      hovered === name && !(name === 'destination' && destinationOpen) && !(name === 'guest' && guestOpen) ? 'bg-gray-100' : ''
    }`

  const handleSearch = () => {
    const totalGuests = guests.adults + guests.children
    onSearch?.({ destination, guests: totalGuests })
  }

  return (
    <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-md h-16 w-full max-w-3xl">

      {/* 여행지 탭 */}
      <div
        className={tabClass('destination')}
        onMouseEnter={() => setHovered('destination')}
        onMouseLeave={() => setHovered(null)}
      >
        <DestinationField
          isOpen={destinationOpen}
          onToggle={setDestinationOpen}
          onSelect={setDestination}
        />
      </div>

      <Divider hidden={divider1Hidden} />

      {/* 날짜 탭 */}
      <div
        className={tabClass('date')}
        onMouseEnter={() => setHovered('date')}
        onMouseLeave={() => setHovered(null)}
      >
        <DateField />
      </div>

      <Divider hidden={divider2Hidden} />

      {/* 여행자 탭 + 검색 버튼 */}
      <div
        className={tabClass('guest')}
        onMouseEnter={() => setHovered('guest')}
        onMouseLeave={() => setHovered(null)}
      >
        <GuestField
          isOpen={guestOpen}
          onToggle={setGuestOpen}
          guests={guests}
          onGuestsChange={setGuests}
        />
        <SearchButton isOpen={guestOpen} onClick={handleSearch} />
      </div>

    </div>
  )
}
