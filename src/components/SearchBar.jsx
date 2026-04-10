import React, { useState } from 'react'; 
// useState는 이름으로 불러오기 --> 앞으로 사용시 React. 안붙이고 그냥 useState만으로 사용가능
import GuestTrigger from './GuestTrigger';
import GuestModal from './GuestModal';

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen: 모달 창이 열려있는지 닫혀있는지 기억하는 스위치 (처음에는 false로 시작)
  // setIsModalOpen: isModalOpen 상태 수정할 수 있는 리모컨
  const [guests, setGuests] = useState({
  // guest: 게스트 인원수를 기록해 두는 장부 
  // setGuests: guests의 데이터를 수정할 수 있는 리모컨
  // 성인, 어린이, 유아를 각각 따로 기억해야 하므로 자바스크립트의 객체({}) 형태로 묶어서 관리
    adults: 0,
    children: 0,
    infants: 0,
  });

  const updateGuestCount = (type, change) => { 
  // 자식 컴포넌트(GuestModal)에서 버튼을 누를 때마다 실행될 숫자 변경 리모컨
  // 어떤 종류(type)를 얼마만큼(change) 바꿀지 지시받음
    setGuests((prev) => ({
      ...prev,
      [type]: prev[type] + change,
    }));      
    // React의 철칙은 "기존 장부를 직접 지우개로 지워서 수정하지 말고, 아예 새로운 종이에 옮겨 적어서 통째로 교체하라(불변성)"는 것
    // 1단계: 새로운 빈 껍데기 상자 ({})를 만듦
    // 2단계: ...prev (기존 장부 복사하기)
    // prev는 수정되기 직전의 기존 장부 기록, ...prev는 일단 기존 장부 내용을 그대로 다 복사해오라는 뜻
    // 3단계: [type]: prev[type] + change (원하는 항목만 덮어쓰기)
    // 그 복사본 위에서 사용자가 누른 특정 타입([type])의 숫자만 수정해서 완전히 새로운 장부로 안전하게 덮어쓰는 방식
    // 4단계: 자바스크립트의 '덮어쓰기' 마법
    // 자바스크립트 객체({}) 안에서는 똑같은 이름(adults)이 두 번 나오면, 무조건 아래쪽에 있는 최신 값이 위에 있는 옛날 값을 덮어써서 뭉개버림
  };

  const totalGuests = guests.adults + guests.children + guests.infants;
  // 렌더링될 때마다 현재 장부에 적힌 성인, 어린이, 유아 숫자를 모두 더해서 총합을 계산

  return (
    <div className="search-bar-trigger" >

      <div style={{ flex: 1, paddingRight: '1rem', borderRight: '1px solid #ddd' }}>
        <div className="search-label">여행지</div>
        <div className="search-value">검색어 입력창 들어올 자리...</div>
      </div>

      <GuestTrigger 
        totalGuests={totalGuests} 
        onClick={() => setIsModalOpen(!isModalOpen)} 
      />

      {/* 핑크색 검색 버튼 추가 */}
      <button className="search-submit-btn">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible'}}>
          <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
        </svg>
        <span>검색</span>
      </button>

      {isModalOpen && <GuestModal guests={guests} updateGuestCount={updateGuestCount} />} 
      {/* isModalOpen 스위치가 true인 경우에만 띄움 */}
    </div>
  );
}