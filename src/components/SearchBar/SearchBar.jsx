import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.field}>
        <span className={styles.label}>여행지</span>
        <span className={styles.value}>여행지 검색</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.field}>
        <span className={styles.label}>날짜</span>
        <span className={styles.value}>날짜 추가</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.field}>
        <span className={styles.label}>여행자</span>
        <span className={styles.value}>게스트 추가</span>
      </div>
      <button className={styles.searchButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
          <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
        검색
      </button>
    </div>
  );
}

export default SearchBar;
