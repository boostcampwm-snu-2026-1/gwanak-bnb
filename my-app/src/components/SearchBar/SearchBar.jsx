import { useState, useEffect, useRef } from 'react';
import DatePicker from '../DatePicker/DatePicker';
import GuestSelector from '../GuestSelector/GuestSelector';
import LocationSearch from '../LocationSearch/LocationSearch';
import { searchKeywords } from '../../data/destinations';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [savedQuery, setSavedQuery] = useState('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

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

  const handleDateSelect = (date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
      setActiveField(null);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
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
      if (highlightedIndex === -1) setSavedQuery(locationQuery);
      const nextIndex = (highlightedIndex + 1) % list.length;
      setHighlightedIndex(nextIndex);
      setLocationQuery(list[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (highlightedIndex === -1) setSavedQuery(locationQuery);
      const nextIndex = (highlightedIndex - 1 + list.length) % list.length;
      setHighlightedIndex(nextIndex);
      setLocationQuery(list[nextIndex]);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleLocationSelect(list[highlightedIndex]);
      setSavedQuery('');
    } else if (e.key === 'Escape') {
      if (highlightedIndex >= 0) {
        setLocationQuery(savedQuery);
        setHighlightedIndex(-1);
        setSavedQuery('');
      } else {
        handleClose();
      }
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
        <span className={styles.placeholder}>
          {checkIn && checkOut
            ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
            : checkIn
              ? `${formatDate(checkIn)} - 체크아웃`
              : '날짜 추가'}
        </span>
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

      <DatePicker
        isOpen={activeField === 'date'}
        checkIn={checkIn}
        checkOut={checkOut}
        onDateSelect={handleDateSelect}
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
