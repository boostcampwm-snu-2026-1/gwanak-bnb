import { useState } from 'react'
import GuestModal from '../GuestModal/GuestModal'
import styles from './SearchBar.module.css'

function SearchBar({ guestCounts, setGuestCounts }) {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  const adjustCount = (key, delta) => {
    setGuestCounts((prev) => {
      const nextValue = Math.max(0, prev[key] + delta)
      return {
        ...prev,
        [key]: nextValue,
      }
    })
  }

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <button className={styles.field} type="button">
            <span className={styles.label}>여행지</span>
            <span className={styles.placeholder}>여행지 검색</span>
          </button>

          <button className={styles.field} type="button">
            <span className={styles.label}>날짜</span>
            <span className={styles.placeholder}>날짜 추가</span>
          </button>

          <button
            className={`${styles.field} ${styles.guestField}`}
            type="button"
            onClick={() => setIsGuestModalOpen((prev) => !prev)}
          >
            <span className={styles.label}>여행자</span>
            <span className={styles.placeholder}>게스트 추가</span>
            <span className={styles.searchButton}>검색</span>
          </button>
        </div>

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
