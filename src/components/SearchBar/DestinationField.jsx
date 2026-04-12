import styles from './SearchBar.module.css'

function DestinationField({ isActive, onClick }) {
  return (
    <button
      className={`${styles.field} ${isActive ? styles.destinationFieldActive : ''}`}
      type="button"
      onClick={onClick}
      aria-expanded={isActive}
      aria-controls="destination-dropdown"
      aria-haspopup="listbox"
    >
      <span className={styles.label}>여행지</span>
      <span className={styles.placeholder}>여행지 검색</span>
    </button>
  )
}

export default DestinationField
