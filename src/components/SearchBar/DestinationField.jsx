import styles from './SearchBar.module.css'

function DestinationField() {
  return (
    <button className={styles.field} type="button">
      <span className={styles.label}>여행지</span>
      <span className={styles.placeholder}>여행지 검색</span>
    </button>
  )
}

export default DestinationField
