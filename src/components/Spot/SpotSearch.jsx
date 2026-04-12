import React, { useState } from 'react';
import SpotPopup from './SpotPopup';
import './SpotSearch.css';

const TEMP = [ // 임시..
    { id: 1, name: "근처" },
    { id: 2, name: "광안리" },
    { id: 3, name: "부산" },
    { id: 4, name: "오사카" },
    { id: 5, name: "강릉" },
    { id: 6, name: "제주" }
];

export default function SpotSearch() {
  
    const [keyword, setKeyword] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const keywordList = keyword === ""
        ? TEMP
        : TEMP.filter(item => item.name.includes(keyword));

    const handleInputChange = (e) => { // 입력창 변화 감지
        setKeyword(e.target.value);
        setIsPopupOpen(true); 
    };

    return (
        <div className="spot-search" style={{ position: 'relative' }}>
      
        <div 
        className="spot-text"
        onClick={() => setIsPopupOpen(true)}
        >
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

        {isPopupOpen && (
            <SpotPopup 
            list={keywordList} 
            onItemClick={(name) => {
                setKeyword(name);   //인풋 업데이트
                setIsPopupOpen(false); 
            }}
            />
        )}
      
        </div>
    );
}