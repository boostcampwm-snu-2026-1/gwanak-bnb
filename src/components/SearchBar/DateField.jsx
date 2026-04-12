import styles from './SearchBar.module.css'

function DateField() {
  return (
    <button className={styles.field} type="button">
      <span className={styles.label}>날짜</span>
      <span className={styles.placeholder}>날짜 추가</span>
    </button>
  )
}

export default DateField
