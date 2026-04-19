import { useState } from 'react'
import TravelerPopup from '../Traveler/TravelerPopup' // 여행자 팝업 컴포넌트
import SpotSearch from '../Spot/SpotSearch'; // 여행지 검색 컴포넌트
import './SearchBar.css'

function SearchBar({ setRooms }) {
  const [keyword, setKeyword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [travelerCounts, setTravelerCounts] = useState({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  const handleSearchSubmit = async () => {

    if (!keyword.trim()) {
    alert("여행지를 입력해주세요!");
    return;
  }

  if (travelerCounts.adult === 0) {
    alert("최소 성인 1명 이상은 선택해야 합니다.");
    return;
  }
  
    const searchData = {
      destination: keyword,
      travelers: travelerCounts
    };

    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Response:', result);

      if (result.status === 'success') {
        setRooms(result.data); 
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="search-bar">
        <div className="spot">
            <SpotSearch keyword={keyword} setKeyword={setKeyword} /></div>

      <div className="divider"></div>

      <div className="date">
        <h2>날짜</h2>
        <span className="placeholder">날짜 추가</span>
      </div>

      <div className="divider"></div>

      <div className="traveler" onClick={togglePopup}>
        <div className="traveler-text">
          <h2>여행자</h2>
          <span className="placeholder">게스트 추가</span>
        </div>

        {isPopupOpen && (<TravelerPopup 
            counts={travelerCounts} 
            setCounts={setTravelerCounts} 
          />
        )}
      </div>

      <button className="search-btn" onClick={handleSearchSubmit}>🔍</button>
    </div>
  )
}

export default SearchBar;