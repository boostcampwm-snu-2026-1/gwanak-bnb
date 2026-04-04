import React from 'react';

function SearchBar({ adults, children, infants, isModalOpen, setIsModalOpen }) {
  const totalGuests = adults + children;
  const getDisplayText = () => {
    if (totalGuests === 0 && infants === 0) return "게스트 추가";
    let text = `게스트 ${totalGuests}명`;
    if (infants > 0) text += `, 유아 ${infants}명`;
    return text;
  };

  return (
    <div className="search-bar-container">
      <div className="search-item traveler-selection">
        <span className="label">여행자</span>
        <button 
          className={`search-button ${isModalOpen ? 'active' : ''}`}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {getDisplayText()}
        </button>
      </div>
      <button className="search-icon-button">
        <span className="search-icon">🔍</span>
      </button>
    </div>
  );
}

export default SearchBar;