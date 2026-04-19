import { useState, useRef, useEffect } from 'react';
import './DestinationSearch.css';

const recommendedDestinations = [
  {
    icon: '🏡',
    name: '서귀포시',
    description: '제주 남쪽의 감성 숙소',
  },
  {
    icon: '🌿',
    name: '제주시',
    description: '제주 북쪽의 인기 숙소',
  },
  {
    icon: '🏖️',
    name: '광안리해수욕장',
    description: '해변으로 인기 있는 곳',
  },
  {
    icon: '🏯',
    name: '오사카시, 일본',
    description: '관광 명소: 오사카성',
  },
  {
    icon: '🌃',
    name: '부산, 부산',
    description: '화려한 나이트라이프로 유명한 곳',
  },
  {
    icon: '🌿',
    name: '제주',
    description: '자연을 만끽하기 좋은 곳',
  },
  {
    icon: '🏔️',
    name: '속초시, 강원도',
    description: '호수로 인기 있는 곳',
  },
  {
    icon: '🌊',
    name: '강릉시, 강원도',
    description: '해변의 매력을 느낄 수 있는 곳',
  },
];

function DestinationSearch({ selectedDestination, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDestinations = query
    ? recommendedDestinations.filter(
        (d) => d.name.includes(query) || d.description.includes(query)
      )
    : recommendedDestinations;

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('.destination-item');
      items[highlightIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);
    setInputValue(value);
    setHighlightIndex(-1);
  }

  function handleKeyDown(e) {
    const len = filteredDestinations.length;
    if (len === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = highlightIndex < len - 1 ? highlightIndex + 1 : 0;
      setHighlightIndex(next);
      setInputValue(filteredDestinations[next].name);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = highlightIndex > 0 ? highlightIndex - 1 : len - 1;
      setHighlightIndex(next);
      setInputValue(filteredDestinations[next].name);
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredDestinations[highlightIndex]);
    }
  }

  function handleSelect(destination) {
    onSelect(destination.name);
    setQuery('');
    setInputValue('');
    setHighlightIndex(-1);
    setIsOpen(false);
  }

  return (
    <div className="destination-search" ref={containerRef}>
      <button
        type="button"
        className={`destination-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="destination-label">여행지</span>
        <span className="destination-value">
          {selectedDestination || '여행지 검색'}
        </span>
      </button>

      {isOpen && (
        <div className="destination-dropdown">
          <input
            className="destination-input"
            type="text"
            placeholder="여행지 검색"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <div className="destination-list" ref={listRef}>
            <h4 className="destination-list-title">추천 여행지</h4>
            {filteredDestinations.map((dest, index) => (
              <button
                type="button"
                key={dest.name}
                className={`destination-item ${index === highlightIndex ? 'highlighted' : ''}`}
                onClick={() => handleSelect(dest)}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                <span className="destination-item-icon">{dest.icon}</span>
                <div className="destination-item-text">
                  <span className="destination-item-name">{dest.name}</span>
                  <span className="destination-item-desc">
                    {dest.description}
                  </span>
                </div>
              </button>
            ))}
            {filteredDestinations.length === 0 && (
              <p className="destination-empty">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationSearch;
