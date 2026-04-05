import React, { useState } from 'react';
import GuestModal from './GuestModal';

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const updateGuestCount = (type, change) => {
    setGuests((prev) => ({
      ...prev,
      [type]: prev[type] + change,
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  return (
    <div className="search-bar-trigger" onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className="search-text-container">
        <div className="search-label">여행자</div>
        <div className={`search-value ${totalGuests > 0 ? 'has-value' : ''}`}>
          {totalGuests === 0 ? '게스트 추가' : `게스트 ${totalGuests}명`}
        </div>
      </div>

      {/* 핑크색 검색 버튼 추가 */}
      <button className="search-submit-btn">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible'}}>
          <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
        </svg>
        <span>검색</span>
      </button>

      {isModalOpen && <GuestModal guests={guests} updateGuestCount={updateGuestCount} />}
    </div>
  );
}