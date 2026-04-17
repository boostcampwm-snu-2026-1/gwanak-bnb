import { useState, useRef, useEffect, useCallback } from 'react';
import GuestSelector from './GuestSelector';
import SearchDropdown from './SearchDropdown';
import styles from './SearchBar.module.css';

function formatDateRange(checkIn, checkOut) {
  if (!checkIn && !checkOut) {
    return '언제든 일주일';
  }

  if (checkIn && !checkOut) {
    return `${checkIn} 체크인`;
  }

  if (!checkIn && checkOut) {
    return `${checkOut} 체크아웃`;
  }

  return `${checkIn} - ${checkOut}`;
}

export default function SearchBar({ searchFilters, onSearch }) {
  const [showGuests, setShowGuests] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchFilters.location);
  const [guests, setGuests] = useState({
    adults: searchFilters.guests,
    children: 0,
    infants: searchFilters.infants,
  });
  const [dates, setDates] = useState({
    checkIn: searchFilters.checkIn,
    checkOut: searchFilters.checkOut,
  });
  const guestRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const totalGuests = guests.adults + guests.children;
  const guestText = totalGuests > 0
    ? `게스트 ${totalGuests}명${guests.infants > 0 ? `, 유아 ${guests.infants}명` : ''}`
    : '게스트 추가';

  useEffect(() => {
    function handleClickOutside(e) {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuests(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setShowSearch(true);
    setShowGuests(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleQueryChange = useCallback((value, fromKeyboard = false) => {
    setSearchQuery(value);
    if (!fromKeyboard) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, []);

  const handleCloseSearch = useCallback(() => {
    setShowSearch(false);
  }, []);

  const handleDateChange = (field, value) => {
    setDates((prev) => {
      const next = { ...prev, [field]: value };

      if (field === 'checkIn' && next.checkOut && value && next.checkOut < value) {
        next.checkOut = value;
      }

      if (field === 'checkOut' && next.checkIn && value && value < next.checkIn) {
        next.checkIn = value;
      }

      return next;
    });
  };

  const handleSubmitSearch = () => {
    onSearch({
      location: searchQuery.trim(),
      guests: totalGuests,
      infants: guests.infants,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
    });
    setShowGuests(false);
    setShowSearch(false);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.fieldWrapper} ref={searchRef}>
        {showSearch ? (
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="여행지 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        ) : (
          <button className={styles.field} onClick={handleSearchClick}>
            <span className={styles.label}>
              {searchQuery || '어디든지'}
            </span>
          </button>
        )}
        {showSearch && (
          <SearchDropdown
            key={searchQuery}
            query={searchQuery}
            onQueryChange={handleQueryChange}
            onClose={handleCloseSearch}
          />
        )}
      </div>
      <span className={styles.divider} />
      <div className={`${styles.field} ${styles.dateField}`}>
        <div className={styles.dateSummary}>{formatDateRange(dates.checkIn, dates.checkOut)}</div>
        <div className={styles.dateInputs}>
          <label className={styles.dateInputGroup}>
            <span>체크인</span>
            <input
              className={styles.dateInput}
              type="date"
              value={dates.checkIn}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
            />
          </label>
          <label className={styles.dateInputGroup}>
            <span>체크아웃</span>
            <input
              className={styles.dateInput}
              type="date"
              min={dates.checkIn || undefined}
              value={dates.checkOut}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
            />
          </label>
        </div>
      </div>
      <span className={styles.divider} />
      <div className={styles.fieldWrapper} ref={guestRef}>
        <button
          className={`${styles.field} ${showGuests ? styles.active : ''}`}
          onClick={() => { setShowGuests(!showGuests); setShowSearch(false); }}
        >
          <span className={totalGuests > 0 ? styles.label : styles.placeholder}>
            {guestText}
          </span>
        </button>
        {showGuests && (
          <GuestSelector guests={guests} setGuests={setGuests} />
        )}
      </div>
      <button className={styles.searchBtn} onClick={handleSubmitSearch}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}
