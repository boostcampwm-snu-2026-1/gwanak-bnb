import React, { useRef, useEffect } from 'react';

export default function RecommendBox({ results, focusedIndex, onSelect }) {

// 드롭다운 전체를 감싸는 박스에 접근하기 위한 리모컨
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current && focusedIndex >= 0) {
      const container = boxRef.current; // 전체 스크롤 박스
      const activeItem = container.children[focusedIndex]; // 현재 선택된 여행지 줄

      if (activeItem) {
        const containerHeight = container.clientHeight; // 화면에 보이는 박스 높이
        const itemTop = activeItem.offsetTop;           // 아이템의 Y 좌표 위치
        const itemHeight = activeItem.offsetHeight;     // 아이템 하나의 높이

        // 1. 방향키를 내려서 아이템이 화면 아래로 벗어났을 때 (스크롤 내리기)
        if (itemTop + itemHeight > container.scrollTop + containerHeight) {
          container.scrollTop = itemTop + itemHeight - containerHeight;
        }
        // 2. 방향키를 올려서 아이템이 화면 위로 벗어났을 때 (스크롤 올리기)
        else if (itemTop < container.scrollTop) {
          container.scrollTop = itemTop;
        }
      }
    }
  }, [focusedIndex]);


  // 검색 결과가 없을 때 보여줄 화면
  if (results.length === 0) {
    return (
      <div className="recommend-box" style={{ padding: '2rem', textAlign: 'center', color: '#717171' }}>
        일치하는 여행지가 없습니다.
      </div>
    );
  }

  return (
    <div className="recommend-box" ref={boxRef}>
      {results.map((item, index) => (
        <div 
          key={item.id}
          // 현재 인덱스가 focusedIndex와 같으면 'focused' 클래스를 추가하여 회색 배경 표시
          className={`recommend-item ${index === focusedIndex ? 'focused' : ''}`}
          onClick={() => onSelect(item.name)}
        >
          <div className="location-icon">
            {/* 임시 위치 핀 아이콘 */}
            📍
          </div>
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
}