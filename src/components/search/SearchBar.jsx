import { useState, useRef, useEffect, useCallback } from 'react';
import GuestSelector from './GuestSelector';
import SearchDropdown from './SearchDropdown';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [showGuests, setShowGuests] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });
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
            query={searchQuery}
            onQueryChange={handleQueryChange}
            onClose={handleCloseSearch}
          />
        )}
      </div>
      <span className={styles.divider} />
      <button className={styles.field}>
        <span className={styles.label}>언제든 일주일</span>
      </button>
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
      <button className={styles.searchBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}
