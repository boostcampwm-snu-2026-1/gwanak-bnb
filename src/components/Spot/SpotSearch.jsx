import React, { useState } from 'react';
import SpotPopup from './SpotPopup';
import './SpotSearch.css';

const TEMP_RECOMMEND = [
	{ id: 1, name: "근처 체험 찾기", desc: "가까운 곳에서 즐길 수 있는 체험"},
	{ id: 2, name: "광안리해수욕장", desc: "해변으로 인기 있는 곳"},
	{ id: 3, name: "제주", desc: "자연을 만끽하기 좋은 곳"}
];

const TEMP = [ // 임시..
    { id: 1, name: "서울", desc: "대한민국"},
	{ id: 2, name: "부산", desc: "대한민국·도시"},
	{ id: 3, name: "강릉", desc: "대한민국·강원도·도시"},
	{ id: 4, name: "오사카", desc: "일본·오사카부·도시"},
	{ id: 5, name: "제주도", desc: "대한민국·제주·도시"}
];

export default function SpotSearch() {
  
    const [keyword, setKeyword] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const keywordList = keyword === ""
        ? TEMP_RECOMMEND
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
                keyword={keyword}
                onItemClick={(name) => {
                    setKeyword(name);   //인풋 업데이트
                    setIsPopupOpen(false); 
                }}
            />
        )}
      
        </div>
    );
}