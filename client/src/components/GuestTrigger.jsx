import React from 'react';

export default function GuestTrigger({ totalGuests, onClick }) {
  return (
    <div className="search-section" onClick={onClick}>
      <div className="search-label">여행자</div>
      <div className={`search-value ${totalGuests > 0 ? 'has-value' : ''}`}>
        {totalGuests === 0 ? '게스트 추가' : `게스트 ${totalGuests}명`}
      </div>
    </div>
  );
}