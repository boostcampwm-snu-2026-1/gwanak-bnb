import { useState } from 'react';
import GuestSelector from '../GuestSelector/GuestSelector';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const isExpanded = activeField !== null;

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

  return (
    <div className={styles.searchBar}>
      <div
        className={`${styles.field} ${activeField === 'location' ? styles.active : ''}`}
        onClick={() => handleFieldClick('location')}
      >
        <span className={styles.label}>여행지</span>
        <span className={styles.placeholder}>여행지 검색</span>
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
        <span className={styles.placeholder}>게스트 추가</span>
      </div>

      <button className={`${styles.searchButton} ${isExpanded ? styles.searchButtonExpanded : ''}`}>
        <span>🔍</span>
        {isExpanded && <span>검색</span>}
      </button>

      <GuestSelector
        isOpen={isGuestOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default SearchBar;
