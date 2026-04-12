import { useState, useEffect, useRef } from 'react'
import GuestPopup from './GuestPopup'
import DestinationPopup from './DestinationPopup'
import './SearchBar.css'

const recommendedDestinations = [
  { id: 1, label: '여수', description: '전라남도 · 대한민국' },
  { id: 2, label: '부산', description: '대한민국의 대표 해안 도시' },
  { id: 3, label: '도쿄', description: '일본 · 대도시 여행지' },
  { id: 4, label: '강릉', description: '강원도 · 바다 여행지' },
  { id: 5, label: '속초', description: '강원도 · 해변과 산' },
]

export default function SearchBar() {
  const [openPanel, setOpenPanel] = useState(null)
  // 'destination' | 'date' | 'guest' | null

  const [searchKeyword, setSearchKeyword] = useState('')
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

  const searchBarRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setOpenPanel(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const trimmedKeyword = searchKeyword.trim()

    if (trimmedKeyword === '') {
      setDestinationResults([])
      setIsLoading(false)
      setError(null)
      return
    }

    const fetchDestinations = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(
          `http://localhost:3001/destinations?label:contains=${encodeURIComponent(trimmedKeyword)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch destinations')
        }

        const data = await response.json()
        setDestinationResults(data)
      } catch (err) {
        setDestinationResults([])
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDestinations()
  }, [searchKeyword])

  const guestCount = guests.adults + guests.children
  const guestSummary = guestCount === 0 ? '게스트 추가' : `게스트 ${guestCount}명`

  const filteredDestinations = recommendedDestinations.filter((item) =>
    item.label.toLowerCase().includes(searchKeyword.trim().toLowerCase())
  )

  const destinationItems =
    searchKeyword.trim() === '' ? recommendedDestinations : destinationResults

  const handleSelectDestination = (item) => {
    setSelectedDestination(item)
    setDestinationInput(item.label)
    setSearchKeyword(item.label)
    setHighlightedIndex(-1)
    setOpenPanel(null)
  }

  const handleClearDestination = () => {
    setDestinationInput('')
    setSearchKeyword('')
    setSelectedDestination(null)
    setHighlightedIndex(-1)
    setOpenPanel('destination')
  }

  const handleDestinationKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpenPanel(null)
      return
    }

    if (destinationItems.length === 0) {
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()

      const nextIndex =
        highlightedIndex === destinationItems.length - 1
          ? 0
          : highlightedIndex + 1

      setHighlightedIndex(nextIndex)
      setDestinationInput(destinationItems[nextIndex].label)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()

      const nextIndex =
        highlightedIndex <= 0
          ? destinationItems.length - 1
          : highlightedIndex - 1

      setHighlightedIndex(nextIndex)
      setDestinationInput(destinationItems[nextIndex].label)
      return
    }

    if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        e.preventDefault()
        handleSelectDestination(destinationItems[highlightedIndex])
      }
    }
  }

  return (
    <section className="search-bar" ref={searchBarRef}>
      <div className="destination-wrapper">
        <div
          className="search-bar__section search-bar__section--destination"
          onClick={() => setOpenPanel('destination')}
        >
          <div className="search-bar__text">
            <p className="search-bar__label">여행지</p>
            <input
              className="search-bar__input"
              type="text"
              placeholder="여행지 검색"
              value={destinationInput}
              onClick={() => setOpenPanel('destination')}
              onChange={(e) => {
                const value = e.target.value
                setDestinationInput(value)
                setSearchKeyword(value)
                setSelectedDestination(null)
                setHighlightedIndex(-1)
                setOpenPanel('destination')
              }}
              onKeyDown={handleDestinationKeyDown}
            />
          </div>

          {destinationInput.trim() !== '' && (
            <button
              type="button"
              className="search-bar__clear-button"
              onClick={(e) => {
                e.stopPropagation()
                handleClearDestination()
              }}
              aria-label="여행지 입력 지우기"
            >
              ×
            </button>
          )}
        </div>

        {openPanel === 'destination' && (
          <DestinationPopup
            items={destinationItems}
            query={destinationInput}
            highlightedIndex={highlightedIndex}
            isLoading={isLoading}
            error={error}
            onSelect={handleSelectDestination}
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