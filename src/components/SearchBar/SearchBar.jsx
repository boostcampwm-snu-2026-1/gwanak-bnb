import styles from './SearchBar.module.css'

function SearchBar() {
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

          <button className={`${styles.field} ${styles.guestField}`} type="button">
            <span className={styles.label}>여행자</span>
            <span className={styles.placeholder}>게스트 추가</span>
            <span className={styles.searchButton}>검색</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default SearchBar
