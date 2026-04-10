import React from 'react';

export default function GuestTrigger({ totalGuests, onClick }) {
  return (
    <div 
      className="guest-trigger-container" 
      onClick={onClick}
      // 임시 스타일: 왼쪽 입력창과 구분되도록 여백을 줍니다
      style={{ flex: 1, paddingLeft: '1.5rem', cursor: 'pointer' }}
    >
      <div className="search-label">여행자</div>
      <div className={`search-value ${totalGuests > 0 ? 'has-value' : ''}`}>
        {totalGuests === 0 ? '게스트 추가' : `게스트 ${totalGuests}명`}
      </div>
    </div>
  );
}