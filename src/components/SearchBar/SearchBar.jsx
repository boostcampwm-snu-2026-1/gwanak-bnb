import { useEffect, useMemo, useRef, useState } from 'react'
import GuestModal from '../GuestModal/GuestModal'
import { recommendedDestinations, searchableDestinations } from '../../mocks/destinations'
import DestinationDropdown from './DestinationDropdown'
import SearchFields from './SearchFields'
import styles from './SearchBar.module.css'

function getGuestSummary({ adults, children, infants, pets }) {
  const guestTotal = adults + children
  const parts = []

  if (guestTotal > 0) {
    parts.push(`게스트 ${guestTotal}명`)
  }

  if (infants > 0) {
    parts.push(`유아 ${infants}명`)
  }

  if (pets > 0) {
    parts.push(`반려동물 ${pets}마리`)
  }

  if (parts.length === 0) {
    return '게스트 추가'
  }

  return parts.join(', ')
}

function SearchBar({ guestCounts, setGuestCounts }) {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isDestinationOpen, setIsDestinationOpen] = useState(false)
  const [destinationQuery, setDestinationQuery] = useState('')
  const [destinationInput, setDestinationInput] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const guestSummary = getGuestSummary(guestCounts)
  const trimmedInput = destinationQuery.trim()
  const destinationMode = trimmedInput ? 'search' : 'recommended'

  const filteredDestinations = useMemo(() => {
    if (destinationMode === 'recommended') {
      return recommendedDestinations
    }

    const normalizedQuery = trimmedInput.toLowerCase()
    return searchableDestinations.filter((destination) => {
      const haystack = `${destination.title} ${destination.subtitle}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [destinationMode, trimmedInput])

  const activeOptionId =
    isDestinationOpen && highlightedIndex >= 0
      ? `destination-option-${highlightedIndex}`
      : undefined

  const adjustCount = (key, delta) => {
    setGuestCounts((prev) => {
      const nextValue = Math.max(0, prev[key] + delta)
      return {
        ...prev,
        [key]: nextValue,
      }
    })
  }

  useEffect(() => {
    if (!isGuestModalOpen && !isDestinationOpen) {
      return undefined
    }

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsGuestModalOpen(false)
        setIsDestinationOpen(false)
        setHighlightedIndex(-1)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsGuestModalOpen(false)
        setIsDestinationOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isGuestModalOpen, isDestinationOpen])

  useEffect(() => {
    if (!isGuestModalOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isGuestModalOpen])

  const handleDestinationFieldActivate = () => {
    setIsGuestModalOpen(false)
    setHighlightedIndex(-1)
    setIsDestinationOpen(true)
  }

  const handleDestinationInputChange = (nextInput) => {
    setDestinationQuery(nextInput)
    setDestinationInput(nextInput)
    setHighlightedIndex(-1)
    setIsGuestModalOpen(false)
    setIsDestinationOpen(true)
  }

  const handleDestinationInputClear = () => {
    setDestinationQuery('')
    setDestinationInput('')
    setHighlightedIndex(-1)
    setIsDestinationOpen(true)
  }

  const handleDestinationSelect = (destinationTitle) => {
    setDestinationQuery(destinationTitle)
    setDestinationInput(destinationTitle)
    setHighlightedIndex(-1)
    setIsDestinationOpen(false)
  }

  const handleDestinationHighlight = (index) => {
    setHighlightedIndex(index)
    setDestinationInput(filteredDestinations[index].title)
  }

  const handleGuestFieldToggle = () => {
    setIsDestinationOpen(false)
    setIsGuestModalOpen((prev) => !prev)
  }

  const handleDestinationInputKeyDown = (event) => {
    if (!isDestinationOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsDestinationOpen(true)
    }

    if (filteredDestinations.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = (highlightedIndex + 1 + filteredDestinations.length) % filteredDestinations.length
      setHighlightedIndex(nextIndex)
      setDestinationInput(filteredDestinations[nextIndex].title)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = (highlightedIndex - 1 + filteredDestinations.length) % filteredDestinations.length
      setHighlightedIndex(nextIndex)
      setDestinationInput(filteredDestinations[nextIndex].title)
      return
    }

    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      const destination = filteredDestinations[highlightedIndex]
      handleDestinationSelect(destination.title)
    }
  }

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer} ref={containerRef}>
        <SearchFields
          isDestinationOpen={isDestinationOpen}
          destinationInput={destinationInput}
          activeOptionId={activeOptionId}
          onDestinationFieldActivate={handleDestinationFieldActivate}
          onDestinationInputChange={handleDestinationInputChange}
          onDestinationInputClear={handleDestinationInputClear}
          onDestinationInputKeyDown={handleDestinationInputKeyDown}
          guestSummary={guestSummary}
          isGuestModalOpen={isGuestModalOpen}
          onGuestFieldToggle={handleGuestFieldToggle}
        />

        {isDestinationOpen && (
          <DestinationDropdown
            mode={destinationMode}
            destinations={filteredDestinations}
            highlightedIndex={highlightedIndex}
            onHighlight={handleDestinationHighlight}
            onSelectDestination={handleDestinationSelect}
          />
        )}

        {isGuestModalOpen && (
          <GuestModal
            id="guest-modal"
            guestCounts={guestCounts}
            onDecrement={(key) => adjustCount(key, -1)}
            onIncrement={(key) => adjustCount(key, 1)}
          />
        )}
      </div>
    </section>
  )
}

export default SearchBar
