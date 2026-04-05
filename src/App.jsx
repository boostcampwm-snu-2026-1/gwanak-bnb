import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });

  const updateCount = (type, operation) => {
    setGuests((prev) => {
      const currentCount = prev[type];
      let newCount = currentCount;
      if (operation === 'plus') newCount = currentCount + 1;
      else if (operation === 'minus' && currentCount > 0) newCount = currentCount - 1;
      
      let newAdult = prev.adult;
      if (type !== 'adult' && operation === 'plus' && prev.adult === 0) {
        newAdult = 1;
      }
      return { ...prev, adult: newAdult, [type]: newCount };
    });
  };

  const getGuestText = () => {
    const total = guests.adult + guests.child;
    if (total === 0) return '게스트 추가';
    let text = `게스트 ${total}명`;
    if (guests.infant > 0) text += `, 유아 ${guests.infant}명`;
    if (guests.pet > 0) text += `, 반려동물 ${guests.pet}마리`;
    return text;
  };

  return (
    <div className="container">
      <div className="search-bar">
        {/* 여행지 */}
        <div className="search-section">
          <div className="label">여행지</div>
          <div className="placeholder">여행지 검색</div>
        </div>
        
        <div className="divider" />

        {/* 날짜 */}
        <div className="search-section">
          <div className="label">날짜</div>
          <div className="placeholder">날짜 추가</div>
        </div>

        <div className="divider" />

        {/* 여행자 */}
        <div className="search-section guest-section" onClick={() => setIsModalOpen(!isModalOpen)}>
          <div className="guest-text-group">
            <div className="label">여행자</div>
            <div className={guests.adult > 0 ? "active-text" : "placeholder"}>
              {getGuestText()}
            </div>
          </div>
          
          <button className="search-button">
            <svg viewBox="0 0 32 32" className="search-icon">
              <path d="M29.71 28.29l-6.5-6.5a12 12 0 1 0-1.42 1.42l6.5 6.5a1 1 0 0 0 1.42-1.42zM4 14a10 10 0 1 1 10 10A10 10 0 0 1 4 14z" />
            </svg>
            {isModalOpen && <span className="search-text">검색</span>}
          </button>
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <div className="modal">
            <GuestRow title="성인" desc="13세 이상" count={guests.adult} onMinus={() => updateCount('adult', 'minus')} onPlus={() => updateCount('adult', 'plus')} minusDisabled={guests.adult === 0 || (guests.adult === 1 && (guests.child > 0 || guests.infant > 0 || guests.pet > 0))}/>
            <GuestRow title="어린이" desc="2~12세" count={guests.child} onMinus={() => updateCount('child', 'minus')} onPlus={() => updateCount('child', 'plus')} minusDisabled={guests.child === 0}/>
            <GuestRow title="유아" desc="2세 미만" count={guests.infant} onMinus={() => updateCount('infant', 'minus')} onPlus={() => updateCount('infant', 'plus')} minusDisabled={guests.infant === 0}/>
            <GuestRow title="반려동물" desc="보조동물을 동반하시나요?" count={guests.pet} onMinus={() => updateCount('pet', 'minus')} onPlus={() => updateCount('pet', 'plus')} minusDisabled={guests.pet === 0} isLink={true}/>
          </div>
        )}
      </div>
    </div>
  );
}

function GuestRow({ title, desc, count, onMinus, onPlus, minusDisabled, isLink }) {
  return (
    <div className="guest-row">
      <div className="row-info">
        <div className="row-title">{title}</div>
        <div className={isLink ? "row-desc-link" : "row-desc"}>{desc}</div>
      </div>
      <div className="counter-group">
        <button onClick={onMinus} className="round-btn" disabled={minusDisabled}>－</button>
        <span className="count-text">{count}</span>
        <button onClick={onPlus} className="round-btn">＋</button>
      </div>
    </div>
  );
}