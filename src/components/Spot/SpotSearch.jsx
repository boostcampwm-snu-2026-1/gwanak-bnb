import React, { useState } from 'react';
// import './SpotSearch.css';

export default function SpotSearch() {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e) => { //입력창 변화 감지
    setKeyword(e.target.value);
  };

  return (
    <div className="spot-search">
      <div className="spot-text">
        <div className="label">여행지</div>
        <input
          type="text"
          className="spot-input"
          placeholder="여행지 검색"
          value={keyword}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
}