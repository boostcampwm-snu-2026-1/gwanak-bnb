import { useEffect, useRef, useState } from 'react'
import GuestModal from '../GuestModal/GuestModal'
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
  const containerRef = useRef(null)
  const guestSummary = getGuestSummary(guestCounts)

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
    if (!isGuestModalOpen) {
      return undefined
    }

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsGuestModalOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsGuestModalOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isGuestModalOpen])

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer} ref={containerRef}>
        <SearchFields
          guestSummary={guestSummary}
          isGuestModalOpen={isGuestModalOpen}
          onGuestFieldToggle={() => setIsGuestModalOpen((prev) => !prev)}
        />

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
