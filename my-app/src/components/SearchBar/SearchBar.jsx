import { useState } from 'react';
import GuestSelector from '../GuestSelector/GuestSelector';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  return (
    <div className={styles.searchBar}>
      <div className={styles.field}>
        <span className={styles.label}>여행지</span>
        <span className={styles.placeholder}>여행지 검색</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.label}>체크인</span>
        <span className={styles.placeholder}>날짜 추가</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.label}>체크아웃</span>
        <span className={styles.placeholder}>날짜 추가</span>
      </div>

      <div className={styles.divider} />

      <div
        className={styles.field}
        onClick={() => setIsGuestOpen(!isGuestOpen)}
      >
        <span className={styles.label}>여행자</span>
        <span className={styles.placeholder}>게스트 추가</span>
      </div>

      <button className={styles.searchButton}>검색</button>

      <GuestSelector
        isOpen={isGuestOpen}
        onClose={() => setIsGuestOpen(false)}
      />
    </div>
  );
}

export default SearchBar;
