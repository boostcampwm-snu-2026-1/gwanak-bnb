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
  const [destinationInput, setDestinationInput] = useState('')
  const containerRef = useRef(null)
  const guestSummary = getGuestSummary(guestCounts)
  const trimmedInput = destinationInput.trim()
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
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsGuestModalOpen(false)
        setIsDestinationOpen(false)
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
    setIsDestinationOpen(true)
  }

  const handleDestinationInputChange = (nextInput) => {
    setDestinationInput(nextInput)
    setIsGuestModalOpen(false)
    setIsDestinationOpen(true)
  }

  const handleDestinationInputClear = () => {
    setDestinationInput('')
    setIsDestinationOpen(true)
  }

  const handleDestinationSelect = (destinationTitle) => {
    setDestinationInput(destinationTitle)
    setIsDestinationOpen(false)
  }

  const handleGuestFieldToggle = () => {
    setIsDestinationOpen(false)
    setIsGuestModalOpen((prev) => !prev)
  }

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer} ref={containerRef}>
        <SearchFields
          isDestinationOpen={isDestinationOpen}
          destinationInput={destinationInput}
          onDestinationFieldActivate={handleDestinationFieldActivate}
          onDestinationInputChange={handleDestinationInputChange}
          onDestinationInputClear={handleDestinationInputClear}
          guestSummary={guestSummary}
          isGuestModalOpen={isGuestModalOpen}
          onGuestFieldToggle={handleGuestFieldToggle}
        />

        {isDestinationOpen && (
          <DestinationDropdown
            mode={destinationMode}
            destinations={filteredDestinations}
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
