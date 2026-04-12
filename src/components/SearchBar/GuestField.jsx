import styles from './SearchBar.module.css'

function GuestField({ guestSummary, isGuestModalOpen, onToggle }) {
  return (
    <button
      className={`${styles.field} ${styles.guestField}`}
      type="button"
      onClick={onToggle}
      aria-expanded={isGuestModalOpen}
      aria-controls="guest-modal"
      aria-haspopup="dialog"
    >
      <span className={styles.label}>여행자</span>
      <span className={styles.placeholder}>{guestSummary}</span>
      <span className={styles.searchButton}>검색</span>
    </button>
  )
}

export default GuestField
