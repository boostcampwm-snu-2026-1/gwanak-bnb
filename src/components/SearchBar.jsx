import { useState } from 'react'
import GuestPopup from './GuestPopup'
import DestinationPopup from './DestinationPopup'
import './SearchBar.css'

const recommendedDestinations = [
  { id: 1, label: '여수', description: '전라남도 · 대한민국' },
  { id: 2, label: '부산', description: '대한민국의 대표 해안 도시' },
  { id: 3, label: '도쿄', description: '일본 · 대도시 여행지' },
]



export default function SearchBar() {
  const [openPanel, setOpenPanel] = useState(null)
  // 'destination' | 'date' | 'guest' | null

  const [destinationInput, setDestinationInput] = useState('')
  const [destinationResults, setDestinationResults] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedDestination, setSelectedDestination] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const destinationItems = destinationInput.trim() === '' ? recommendedDestinations : destinationResults

  const handleIncrease = (type) => {
    setGuests((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }

  const handleDecrease = (type) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1),
    }))
  }

  const guestCount = guests.adults + guests.children
  const guestSummary = guestCount === 0 ? '게스트 추가' : `게스트 ${guestCount}명`

  return (
    <section className="search-bar">
      <div className="destination-wrapper">
        <div
          className="search-bar__section"
          onClick={() =>
            setOpenPanel((prev) => (prev === 'destination' ? null : 'destination'))
          }
        >
          <p className="search-bar__label">여행지</p>
          <input
            className="search-bar__input"
            type="text"
            placeholder="여행지 검색"
            value={destinationInput}
            onClick={() => setOpenPanel('destination')}
            onChange={(e) => {
              setDestinationInput(e.target.value)
              setOpenPanel('destination')
              setHighlightedIndex(-1)
            }}
          />
        </div>

        {openPanel === 'destination' && (
          <DestinationPopup
            items={destinationItems}
            query={destinationInput}
            highlightedIndex={highlightedIndex}
            isLoading={isLoading}
            error={error}
            onSelect={(item) => {
              setSelectedDestination(item)
              setDestinationInput(item.label)
              setOpenPanel(null)
            }}
          />
        )}
      </div>

      <div className="search-bar__divider" />

      <div className="search-bar__section">
        <p className="search-bar__label">날짜</p>
        <p className="search-bar__value">날짜 추가</p>
      </div>

      <div className="search-bar__divider" />

      <div className="guest-wrapper">
        <div
          className="search-bar__section search-bar__section--guest"
          onClick={() =>
            setOpenPanel((prev) => (prev === 'guest' ? null : 'guest'))
          }
        >
          <div className="search-bar__text">
            <p className="search-bar__label">여행자</p>
            <p className="search-bar__value">{guestSummary}</p>
          </div>
        </div>

        <button type="button" className="search-bar__button" aria-label="검색">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {openPanel === 'guest' && (
          <GuestPopup
            guests={guests}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        )}
      </div>
    </section>
  )
}