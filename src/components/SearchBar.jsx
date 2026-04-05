import { useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({
  guestSummary,
  isGuestSelectorOpen,
  onToggleGuestSelector,
  onCloseGuestSelector,
  children,
}) {
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (!isGuestSelectorOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        onCloseGuestSelector();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseGuestSelector();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGuestSelectorOpen, onCloseGuestSelector]);

  return (
    <div className={styles.wrapper} ref={searchBarRef}>
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

        <button
          type="button"
          className={`${styles.segment} ${styles.guestSegment}`}
          onClick={onToggleGuestSelector}
          aria-expanded={isGuestSelectorOpen}
          aria-haspopup="dialog"
        >
          <span className={styles.segmentLabel}>여행자</span>
          <strong className={styles.segmentValue}>{guestSummary}</strong>
        </button>

        <button type="button" className={styles.searchButton}>
          검색
        </button>
      </div>

      {isGuestSelectorOpen ? (
        <div className={styles.dropdown} role="dialog" aria-label="여행자 선택">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
