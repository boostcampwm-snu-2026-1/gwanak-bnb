import React, { useState, useRef, useEffect } from 'react'; 
// useState는 이름으로 불러오기 --> 앞으로 사용시 React. 안붙이고 그냥 useState만으로 사용가능
import GuestTrigger from './GuestTrigger';
import GuestModal from './GuestModal';
import DestinationInput from './DestinationInput';
import RecommendBox from './RecommendBox';
import { destinationData } from '../data/destinations'; // mock 데이터 불러오기

export default function SearchBar({ onSearch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isModalOpen: 모달 창이 열려있는지 닫혀있는지 기억하는 스위치 (처음에는 false로 시작)
  // setIsModalOpen: isModalOpen 상태 수정할 수 있는 리모컨

  const [isSearchOpen, setIsSearchOpen] = useState(false); // 추천 검색어 창 열림 여부

  const [keyword, setKeyword] = useState('');
  // 새로 추가된 상태: 검색어 데이터 관련

  const [focusedIndex, setFocusedIndex] = useState(-1); // 키보드로 선택된 아이템의 인덱스 (-1은 아무것도 선택 안 됨)

  const [guests, setGuests] = useState({
  // guest: 게스트 인원수를 기록해 두는 장부 
  // setGuests: guests의 데이터를 수정할 수 있는 리모컨
  // 성인, 어린이, 유아를 각각 따로 기억해야 하므로 자바스크립트의 객체({}) 형태로 묶어서 관리
    adults: 0,
    children: 0,
    infants: 0,
  });

  const searchBarRef = useRef(null); // 외부 클릭 감지를 위한 Ref


  // 외부 클릭 시 모달과 검색창 모두 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 클릭한 곳(event.target)이 searchBarRef(검색바 전체)의 바깥이라면?
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // --- 검색어 필터링 로직 ---
  // 사용자가 입력한 keyword가 포함된 여행지만 걸러냅니다. (keyword가 바뀔 때마다 자동 계산됨)
  const filteredResults = destinationData.filter((item) =>
    item.name.includes(keyword)
  );

  // 검색어가 바뀔 때마다 포커스 인덱스 초기화
  useEffect(() => {
    setFocusedIndex(-1);
  }, [keyword]);

  // --- 키보드 네비게이션 로직 ---
  const handleKeyDown = (e) => {
    if (!isSearchOpen) return; // 창이 닫혀있으면 작동 안 함

    if (e.key === 'ArrowDown') {
      e.preventDefault(); // 커서가 맨 앞으로 이동하는 등 브라우저 기본 동작 방지
      // 마지막 요소면 다시 처음(0)으로, 아니면 +1
      setFocusedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // 첫 요소면 마지막으로, 아니면 -1
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // 엔터를 쳤고, 현재 선택된 항목이 있다면?
      if (focusedIndex >= 0 && focusedIndex < filteredResults.length) {
        handleSelect(filteredResults[focusedIndex].name);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false); // ESC 누르면 창 닫기
    }
  };

  // --- 아이템 선택 로직 ---
  const handleSelect = (selectedName) => {
    setKeyword(selectedName);
    setIsSearchOpen(false);
  };

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
    // 최상위 div에 ref를 달아서 이 영역 전체를 감시
    <div className="search-bar-trigger" ref={searchBarRef} style={{ position: 'relative' }}>

      {/* 1. 여행지 입력창 */}   
      <DestinationInput 
        keyword={keyword} 
        onChange={setKeyword} 
        onFocus={() => {
          setIsSearchOpen(true);
          setIsModalOpen(false); // 검색창 열 땐 게스트 모달 닫기
        }}
        onKeyDown={handleKeyDown}
      />

      {/* 추천 검색어 드롭다운 창 */}
      {isSearchOpen && (
        <RecommendBox 
          results={filteredResults} 
          focusedIndex={focusedIndex} 
          onSelect={handleSelect} 
        />
      )}

      {/* 2. 세로 구분선 */}
      <div className="search-divider"></div>

      {/* 3. 게스트 인원 표시 */}
      <GuestTrigger 
        totalGuests={totalGuests} 
        onClick={() => {
          setIsModalOpen(!isModalOpen);
          setIsSearchOpen(false);
        }} 
      />

      {/* 4. 핑크색 검색 버튼 */}
      <button className="search-submit-btn" onClick={() => onSearch(keyword, totalGuests)}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible'}}>
          <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
        </svg>
        <span>검색</span>
      </button>

      {/* 모달창 */}
      {isModalOpen && <GuestModal guests={guests} updateGuestCount={updateGuestCount} />} 
      {/* isModalOpen 스위치가 true인 경우에만 띄움 */}
    </div>
  );
}