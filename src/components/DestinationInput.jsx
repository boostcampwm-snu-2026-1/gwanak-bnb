import React from 'react';

// 사용자가 글자를 입력할 수 있는 입력창 컴포넌트
// 부모(SearchBar)로부터 검색어 데이터(Keyword)와 그걸 바꾸는 리모컨(onChange)을 전달받아 사용
export default function DestinationInput({ keyword, onChange }) {
  return (
    <div className="search-section">
      <div className="search-label">여행지</div>
      <input
        type="text"
        className="destination-input"
        placeholder="여행지 검색"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        // e.target.value는 사용자가 방금 키보드로 친 최신 글자를 의미
      />
    </div>
  );
}