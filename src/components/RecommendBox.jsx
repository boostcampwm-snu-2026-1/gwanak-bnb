import React from 'react';

export default function RecommendBox({ results, focusedIndex, onSelect }) {
  // 검색 결과가 없을 때 보여줄 화면
  if (results.length === 0) {
    return (
      <div className="recommend-box" style={{ padding: '2rem', textAlign: 'center', color: '#717171' }}>
        일치하는 여행지가 없습니다.
      </div>
    );
  }

  return (
    <div className="recommend-box">
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