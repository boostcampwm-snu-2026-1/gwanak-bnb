import React, { useState} from 'react';
import SpotPopup from './SpotPopup';
import './SpotSearch.css';

const TEMP_RECOMMEND = [
	{ id: 1, name: "근처 체험 찾기", desc: "가까운 곳에서 즐길 수 있는 체험"},
	{ id: 2, name: "광안리", desc: "해변으로 인기 있는 곳"},
	{ id: 3, name: "제주", desc: "자연을 만끽하기 좋은 곳"}
];

const TEMP = [ // 임시..
    { id: 1, name: "서울", desc: "대한민국"},
	{ id: 2, name: "부산", desc: "대한민국·도시"},
	{ id: 3, name: "강릉", desc: "대한민국·강원도·도시"},
	{ id: 4, name: "오사카", desc: "일본·오사카부·도시"},
	{ id: 5, name: "제주도", desc: "대한민국·제주·도시"},
	{ id: 6, name: "광안리해수욕장", desc: "해변으로 인기 있는 곳"}
];

export default function SpotSearch() {
  
    const [keyword, setKeyword] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(-1); // 선택된 여행지 인덱스

    const keywordList = keyword === ""
        ? TEMP_RECOMMEND
        : TEMP.filter(item => item.name.includes(keyword));

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