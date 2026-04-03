import styles from "./SearchBar.module.css";

function SearchBar({ guestSummary }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <button type="button" className={styles.segment}>
          <span className={styles.segmentLabel}>어디로 여행가세요?</span>
          <strong className={styles.segmentValue}>어디든지</strong>
        </button>

        <div className={styles.divider} />

        <button type="button" className={styles.segment}>
          <span className={styles.segmentLabel}>여행 기간</span>
          <strong className={styles.segmentValue}>5월 1일 - 5월 15일</strong>
        </button>

        <div className={styles.divider} />

        <button type="button" className={styles.segment}>
          <span className={styles.segmentLabel}>여행자</span>
          <strong className={styles.segmentValue}>{guestSummary}</strong>
        </button>

        <button type="button" className={styles.searchButton}>
          검색
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

