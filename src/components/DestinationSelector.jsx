import { useState, useRef, useEffect } from "react";
import { RECOMMENDED, ALL_DESTINATIONS } from "../data/destinations";
import DestinationModal from "./DestinationModal";
import styles from "./DestinationSelector.module.css";

function DestinationSelector() {
  const [destination, setDestination] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  const isSearching = query.trim().length > 0;
  const visibleDestinations = isSearching
    ? ALL_DESTINATIONS.filter((d) => d.name.includes(query.trim()))
    : RECOMMENDED;

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen]);

  const handleSelect = (dest) => {
    setDestination(dest);
    setQuery(dest.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    const len = visibleDestinations.length;
    if (len === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (highlightedIndex + 1) % len;
      setHighlightedIndex(next);
      setQuery(visibleDestinations[next].name);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = (highlightedIndex - 1 + len) % len;
      setHighlightedIndex(next);
      setQuery(visibleDestinations[next].name);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(visibleDestinations[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.field} onClick={() => setIsOpen(true)}>
        <span className={styles.fieldLabel}>여행지</span>
        <input
          className={styles.fieldInput}
          type="text"
          placeholder="여행지 검색"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isOpen && (
        <DestinationModal
          destinations={visibleDestinations}
          isSearching={isSearching}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default DestinationSelector;
