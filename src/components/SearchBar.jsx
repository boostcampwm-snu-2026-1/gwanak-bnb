import { useState, useEffect, useRef } from 'react'
import GuestPopup from './GuestPopup'
import DestinationPopup from './DestinationPopup'
import './SearchBar.css'


export default function SearchBar() {
  const [openPanel, setOpenPanel] = useState(null)
  // 'destination' | 'date' | 'guest' | null

  const [searchKeyword, setSearchKeyword] = useState('')
  const [destinationInput, setDestinationInput] = useState('')
  const [recommendedDestinations, setRecommendedDestinations] = useState([])
  const [destinationResults, setDestinationResults] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
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
    if (openPanel !== 'destination') {
      return
    }

    if (searchKeyword.trim() !== '') {
      return
    }

    const fetchRecommendedDestinations = async () => {
      try {
        setError(null)

        const response = await fetch(
          'http://localhost:3001/destinations?recommended=true'
        )

        if (!response.ok) {
          throw new Error('추천 여행지를 불러오지 못했습니다.')
        }

        const data = await response.json()
        setRecommendedDestinations(data)
      } catch (err) {
        setRecommendedDestinations([])
        setError(err.message)
      }
    }

    fetchRecommendedDestinations()
  }, [openPanel, searchKeyword])

  useEffect(() => {
    const trimmedKeyword = searchKeyword.trim()

    if (trimmedKeyword === '') {
      setDestinationResults([])
      setIsLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()

    setIsLoading(true)
    setError(null)

    const timerId = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/destinations?label:contains=${encodeURIComponent(trimmedKeyword)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('여행지 데이터를 불러오지 못했습니다.')
        }

        const data = await response.json()
        setDestinationResults(data)
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }

        setDestinationResults([])
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 150)

    return () => {
      clearTimeout(timerId)
      controller.abort()
    }
  }, [searchKeyword])

  const guestCount = guests.adults + guests.children
  const guestSummary = guestCount === 0 ? '게스트 추가' : `게스트 ${guestCount}명`

  const destinationItems =
    searchKeyword.trim() === '' ? recommendedDestinations : destinationResults
  
  const activeIndex = hoveredIndex >= 0 ? hoveredIndex : highlightedIndex

  const handleSelectDestination = (item) => {
    setSelectedDestination(item)
    setDestinationInput(item.label)
    setSearchKeyword(item.label)
    setHighlightedIndex(-1)
    setHoveredIndex(-1)
    setOpenPanel(null)
  }

  const handleClearDestination = () => {
    setDestinationInput('')
    setSearchKeyword('')
    setSelectedDestination(null)
    setHighlightedIndex(-1)
    setHoveredIndex(-1)
    setOpenPanel('destination')
  }

  const handleDestinationNavigation = (e) => {
    if (openPanel !== 'destination') {
      return
    }

    if (destinationItems.length === 0 && e.key !== 'Escape') {
      return
    }

    const currentIndex = activeIndex

    if (e.key === 'Escape') {
      e.preventDefault()
      setHoveredIndex(-1)
      setOpenPanel(null)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHoveredIndex(-1)

      const nextIndex =
        currentIndex >= destinationItems.length - 1 ? 0 : currentIndex + 1

      setHighlightedIndex(nextIndex)
      setDestinationInput(destinationItems[nextIndex].label)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHoveredIndex(-1)

      const nextIndex =
        currentIndex <= 0 ? destinationItems.length - 1 : currentIndex - 1

      setHighlightedIndex(nextIndex)
      setDestinationInput(destinationItems[nextIndex].label)
      return
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      setHoveredIndex(-1)
      handleSelectDestination(destinationItems[activeIndex])
    }
  }

  useEffect(() => {
    if (openPanel !== 'destination') {
      return
    }

    const handleKeyDown = (e) => {
      const navigationKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape']

      if (!navigationKeys.includes(e.key)) {
        return
      }

      handleDestinationNavigation(e)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openPanel, destinationItems, activeIndex])

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
                setHoveredIndex(-1)
                setOpenPanel('destination')
              }}
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
            query={searchKeyword}
            activeIndex={activeIndex}
            isLoading={isLoading}
            error={error}
            onSelect={handleSelectDestination}
            onItemHover={setHoveredIndex}
            onListLeave={() => setHoveredIndex(-1)}
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