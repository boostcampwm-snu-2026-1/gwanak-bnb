import styles from './SearchBar.module.css'

function GuestField({ guestSummary, isGuestModalOpen, onToggle, onSearchSubmit, isLoading }) {
  return (
    <div className={`${styles.field} ${styles.guestField}`}>
      <button
        className={styles.guestFieldButton}
        type="button"
        onClick={onToggle}
        aria-expanded={isGuestModalOpen}
        aria-controls="guest-modal"
        aria-haspopup="dialog"
      >
        <span className={styles.label}>여행자</span>
        <span className={styles.placeholder}>{guestSummary}</span>
      </button>
      <button className={styles.searchButton} type="button" onClick={onSearchSubmit} disabled={isLoading}>
        {isLoading ? '검색 중' : '검색'}
      </button>
    </div>
  )
}

export default GuestField
