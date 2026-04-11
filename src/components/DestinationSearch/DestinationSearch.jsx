import { useState, useRef, useEffect } from 'react';
import './DestinationSearch.css';

const recommendedDestinations = [
  {
    icon: '📍',
    name: '근처 체험 찾기',
    description: '가까운 곳에서 즐길 수 있는 체험을 찾아보세요.',
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

function DestinationSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(destination) {
    setSelectedDestination(destination.name);
    setIsOpen(false);
  }

  return (
    <div className="destination-search" ref={containerRef}>
      <button
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
          <div className="destination-list">
            <h4 className="destination-list-title">추천 여행지</h4>
            {recommendedDestinations.map((dest) => (
              <button
                key={dest.name}
                className="destination-item"
                onClick={() => handleSelect(dest)}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationSearch;
