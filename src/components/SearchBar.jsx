import { useEffect, useRef } from "react";
import DestinationField from "./search/DestinationField";
import styles from "./SearchBar.module.css";

function SearchBar({
  destinationValue,
  suggestions,
  guestSummary,
  activePanel,
  onOpenPanel,
  onClosePanels,
  onDestinationChange,
  children,
}) {
  const searchBarRef = useRef(null);
  const isDestinationOpen = activePanel === "destination";
  const isGuestSelectorOpen = activePanel === "guests";

  useEffect(() => {
    if (!activePanel) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        onClosePanels();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClosePanels();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePanel, onClosePanels]);

  return (
    <div className={styles.wrapper} ref={searchBarRef}>
      <div className={styles.searchBar}>
        <DestinationField
          value={destinationValue}
          suggestions={suggestions}
          isOpen={isDestinationOpen}
          onChange={onDestinationChange}
          onClose={onClosePanels}
          onOpen={() => onOpenPanel("destination")}
        />

        <div className={styles.divider} />

        <button type="button" className={styles.segment}>
          <span className={styles.segmentLabel}>여행 기간</span>
          <strong className={styles.segmentValue}>5월 1일 - 5월 15일</strong>
        </button>

        <div className={styles.divider} />

        <button
          type="button"
          className={`${styles.segment} ${styles.guestSegment}`}
          onClick={() =>
            onOpenPanel(isGuestSelectorOpen ? null : "guests")
          }
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
