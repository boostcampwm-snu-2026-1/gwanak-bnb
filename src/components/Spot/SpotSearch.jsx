import React, { useState } from 'react';
import SpotPopup from './SpotPopup';
import './SpotSearch.css';
import { Recommend, SpotList } from '../../constants/spotData';

export default function SpotSearch() {
  
    const [keyword, setKeyword] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(-1); // 선택된 여행지 인덱스

    const keywordList = keyword === ""
        ? Recommend
        : SpotList.filter(item => item.name.includes(keyword));

    const tempDisplay = (selectedSpot >= 0 && keywordList[selectedSpot])
		? keywordList[selectedSpot].name
		: keyword;

    const handleInputChange = (e) => { // 입력창 변화 감지
        setKeyword(e.target.value);
        setIsPopupOpen(true); 
        setSelectedSpot(-1); // 입력할 때마다 선택 초기화
    };

    const handleKeyDown = (e) => {
        if(!isPopupOpen||keywordList.length === 0) return;
        if(e.key === "ArrowDown") {
            setSelectedSpot(prev => (prev + 1) % keywordList.length); // 루프
        } else if(e.key === "ArrowUp") {
            setSelectedSpot(prev => (prev - 1 + keywordList.length) % keywordList.length); // 루프
        } else if(e.key === "Enter") {
            setKeyword(tempDisplay); // 선택된 여행지로 인풋 업데이트
            setIsPopupOpen(false);
            setSelectedSpot(-1);
        } else if(e.key === "Escape") {
            setIsPopupOpen(false);
            setSelectedSpot(-1);
        }
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
                value={tempDisplay}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
        </div>

        {isPopupOpen && (
            <SpotPopup 
                list={keywordList} 
                keyword={keyword}
                selectedSpot={selectedSpot}
                onItemClick={(name) => {
                    setKeyword(name);   //인풋 업데이트
                    setIsPopupOpen(false); 
                }}
            />
        )}
      
        </div>
    );
}