import { useState, useEffect, useRef } from 'react';
import GuestSelector from '../GuestSelector/GuestSelector';
import LocationSearch from '../LocationSearch/LocationSearch';
import { searchKeywords } from '../../data/destinations';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

  const inputRef = useRef(null);

  const isExpanded = activeField !== null;

  const filteredSuggestions = locationQuery.trim()
    ? searchKeywords.filter((kw) => kw.includes(locationQuery.trim()))
    : [];

  useEffect(() => {
    if (activeField === 'location') {
      inputRef.current?.focus();
    }
  }, [activeField]);

  const handleQueryChange = (value) => {
    setLocationQuery(value);
    setHighlightedIndex(-1);
  };

  const handleFieldClick = (field) => {
    setActiveField(field);
    if (field === 'guest') {
      setIsGuestOpen(true);
    } else {
      setIsGuestOpen(false);
    }
  };

  const handleClose = () => {
    setActiveField(null);
    setIsGuestOpen(false);
  };

  const handleGuestIncrease = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleGuestDecrease = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] - 1 }));
  };

  const getGuestSummary = () => {
    const total = guests.adults + guests.children;
    const parts = [];
    if (total > 0) parts.push(`게스트 ${total}명`);
    if (guests.infants > 0) parts.push(`유아 ${guests.infants}명`);
    if (guests.pets > 0) parts.push(`반려동물 ${guests.pets}마리`);
    return parts.length > 0 ? parts.join(', ') : '';
  };

  const handleLocationSelect = (name) => {
    setLocationQuery(name);
    setActiveField(null);
  };

  const handleKeyDown = (e) => {
    if (e.isComposing) return;

    const list = filteredSuggestions;
    if (list.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (highlightedIndex + 1) % list.length;
      setHighlightedIndex(nextIndex);
      setLocationQuery(list[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = (highlightedIndex - 1 + list.length) % list.length;
      setHighlightedIndex(nextIndex);
      setLocationQuery(list[nextIndex]);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleLocationSelect(list[highlightedIndex]);
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div className={styles.searchBar}>
      <div
        className={`${styles.field} ${activeField === 'location' ? styles.active : ''}`}
        onClick={() => handleFieldClick('location')}
      >
        <span className={styles.label}>여행지</span>
        {activeField === 'location' ? (
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="여행지 검색"
            value={locationQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={styles.placeholder}>
            {locationQuery || '여행지 검색'}
          </span>
        )}
        {locationQuery && activeField !== 'location' && (
          <button
            className={styles.clearButton}
            onClick={(e) => {
              e.stopPropagation();
              setLocationQuery('');
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.divider} />

      <div
        className={`${styles.fieldWide} ${activeField === 'date' ? styles.active : ''}`}
        onClick={() => handleFieldClick('date')}
      >
        <span className={styles.label}>날짜</span>
        <span className={styles.placeholder}>날짜 추가</span>
      </div>

      <div className={styles.divider} />

      <div
        className={`${styles.field} ${activeField === 'guest' ? styles.active : ''}`}
        onClick={() => handleFieldClick('guest')}
      >
        <span className={styles.label}>여행자</span>
        <span className={styles.placeholder}>
          {getGuestSummary() || '게스트 추가'}
        </span>
      </div>

      <button className={`${styles.searchButton} ${isExpanded ? styles.searchButtonExpanded : ''}`}>
        <span>🔍</span>
        {isExpanded && <span>검색</span>}
      </button>

      <LocationSearch
        isOpen={activeField === 'location'}
        query={locationQuery}
        suggestions={filteredSuggestions}
        highlightedIndex={highlightedIndex}
        onSelect={handleLocationSelect}
        onClose={handleClose}
      />

      <GuestSelector
        isOpen={isGuestOpen}
        onClose={handleClose}
        guests={guests}
        onIncrease={handleGuestIncrease}
        onDecrease={handleGuestDecrease}
      />
    </div>
  );
}

export default SearchBar;
