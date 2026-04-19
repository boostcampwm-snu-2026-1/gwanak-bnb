import { useState, useEffect, useMemo, useRef } from 'react';
import styles from './SearchDropdown.module.css';

const RECOMMENDED_DESTINATIONS = [
  { name: '서울', desc: '한국' },
  { name: '부산', desc: '한국' },
  { name: '제주도', desc: '한국' },
  { name: '강릉', desc: '한국' },
  { name: '경주', desc: '한국' },
  { name: '여수', desc: '한국' },
];

const SEARCH_DATA = [
  '서울 강남', '서울 홍대', '서울 이태원', '서울 명동', '서울 관악구',
  '부산 해운대', '부산 광안리', '부산 서면', '부산 감천문화마을',
  '제주 서귀포', '제주 애월', '제주 성산일출봉', '제주 한림',
  '강릉 경포대', '강릉 안목해변', '강릉 주문진',
  '경주 불국사', '경주 안압지', '경주 첨성대',
  '여수 밤바다', '여수 오동도', '여수 돌산대교',
  '속초 설악산', '속초 중앙시장', '전주 한옥마을', '담양 죽녹원',
];

export default function SearchDropdown({ query, onQueryChange, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef(null);

  const isSearching = query.length > 0;

  const filteredResults = useMemo(() => (
    isSearching
      ? SEARCH_DATA.filter((item) => item.includes(query))
      : []
  ), [isSearching, query]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isSearching || filteredResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => {
          const next = prev >= filteredResults.length - 1 ? 0 : prev + 1;
          onQueryChange(filteredResults[next], true);
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => {
          const next = prev <= 0 ? filteredResults.length - 1 : prev - 1;
          onQueryChange(filteredResults[next], true);
          return next;
        });
      } else if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearching, filteredResults, onQueryChange, onClose]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[selectedIndex];
      if (item) item.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isSearching) {
    return (
      <div className={styles.dropdown}>
        <h4 className={styles.title}>추천 여행지</h4>
        <div className={styles.destinationGrid}>
          {RECOMMENDED_DESTINATIONS.map(({ name, desc }) => (
            <button
              key={name}
              className={styles.destinationItem}
              onClick={() => onQueryChange(name)}
            >
              <div className={styles.destinationIcon}>📍</div>
              <div className={styles.destinationInfo}>
                <span className={styles.destinationName}>{name}</span>
                <span className={styles.destinationDesc}>{desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className={styles.dropdown}>
        <p className={styles.noResults}>검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className={styles.dropdown}>
      <h4 className={styles.title}>추천 검색어</h4>
      <ul className={styles.results} ref={listRef}>
        {filteredResults.map((item, i) => (
          <li
            key={item}
            className={`${styles.resultItem} ${i === selectedIndex ? styles.selected : ''}`}
            onClick={() => {
              onQueryChange(item);
              onClose();
            }}
            onMouseEnter={() => setSelectedIndex(i)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
