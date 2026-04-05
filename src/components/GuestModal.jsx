import React from 'react';

export default function GuestModal({ guests, updateGuestCount }) {
  const handleIncrease = (type) => updateGuestCount(type, 1);
  const handleDecrease = (type) => updateGuestCount(type, -1);

  return (
    // 'guest-modal' 클래스로 둥글고 그림자 있는 컨테이너를 만듭니다.
    <div className="guest-modal" onClick={(e) => e.stopPropagation()}>
      
      {/* 각 행 스타일 적용 */}
      <div className="guest-row">
        <div className="guest-info">
          <span className="guest-title">성인</span>
          <span className="guest-desc">13세 이상</span>
        </div>
        <div className="guest-controls">
          <button 
            className="control-btn"
            onClick={() => handleDecrease('adults')} 
            disabled={guests.adults <= 0}
          >-</button>
          <span className="guest-count">{guests.adults}</span>
          <button 
            className="control-btn"
            onClick={() => handleIncrease('adults')}
          >+</button>
        </div>
      </div>

      {/* 어린이 */}
      <div className="guest-row">
        <div className="guest-info">
          <span className="guest-title">어린이</span>
          <span className="guest-desc">2~12세</span>
        </div>
        <div className="guest-controls">
          <button 
            className="control-btn"
            onClick={() => handleDecrease('children')} 
            disabled={guests.children <= 0}
          >-</button>
          <span className="guest-count">{guests.children}</span>
          <button 
            className="control-btn"
            onClick={() => handleIncrease('children')}
          >+</button>
        </div>
      </div>

      {/* 유아 */}
      <div className="guest-row">
        <div className="guest-info">
          <span className="guest-title">유아</span>
          <span className="guest-desc">2세 미만</span>
        </div>
        <div className="guest-controls">
          <button 
            className="control-btn"
            onClick={() => handleDecrease('infants')} 
            disabled={guests.infants <= 0}
          >-</button>
          <span className="guest-count">{guests.infants}</span>
          <button 
            className="control-btn"
            onClick={() => handleIncrease('infants')}
          >+</button>
        </div>
      </div>
    </div>
  );
}