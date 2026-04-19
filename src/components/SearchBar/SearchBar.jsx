import { useState } from 'react'
import TravelerPopup from '../Traveler/TravelerPopup' // 여행자 팝업 컴포넌트
import SpotSearch from '../Spot/SpotSearch'; // 여행지 검색 컴포넌트
import './SearchBar.css'

function SearchBar() {
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

  const handleSearchSubmit = () => {
    console.log({
      destination: keyword,
      travelers: travelerCounts
    });
  }

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