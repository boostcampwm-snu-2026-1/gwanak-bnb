import { useEffect, useRef } from "react";
import DateRangeField from "./search/DateRangeField";
import DestinationField from "./search/DestinationField";
import styles from "./SearchBar.module.css";

function SearchBar({
  destinationValue,
  suggestions,
  checkIn,
  checkOut,
  guestSummary,
  activePanel,
  feedbackMessage,
  isSearching,
  onOpenPanel,
  onClosePanels,
  onDestinationChange,
  onCheckInChange,
  onCheckOutChange,
  onSubmit,
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
      <form className={styles.searchBar} onSubmit={onSubmit}>
        <DestinationField
          value={destinationValue}
          suggestions={suggestions}
          isOpen={isDestinationOpen}
          onChange={onDestinationChange}
          onClose={onClosePanels}
          onOpen={() => onOpenPanel("destination")}
        />

        <div className={styles.divider} />

        <DateRangeField
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={onCheckInChange}
          onCheckOutChange={onCheckOutChange}
        />

        <div className={styles.divider} />

        <button
          type="button"
          className={`${styles.segment} ${styles.guestSegment}`}
          onClick={() => onOpenPanel(isGuestSelectorOpen ? null : "guests")}
          aria-expanded={isGuestSelectorOpen}
          aria-haspopup="dialog"
        >
          <span className={styles.segmentLabel}>여행자</span>
          <strong className={styles.segmentValue}>{guestSummary}</strong>
        </button>

        <button type="submit" className={styles.searchButton} disabled={isSearching}>
          {isSearching ? "검색 중..." : "검색"}
        </button>
      </form>

      {feedbackMessage ? <p className={styles.feedback}>{feedbackMessage}</p> : null}

      {isGuestSelectorOpen ? (
        <div className={styles.dropdown} role="dialog" aria-label="여행자 선택">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
