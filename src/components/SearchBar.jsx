import { useState } from 'react'
import TravelerPopup from './TravelerPopup' // 여행자 팝업 컴포넌트

function SearchBar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  return (
    <div className="search-bar">
      <div className="spot">
        <h2>여행지</h2>
        <span className="placeholder">여행지 검색</span>
      </div>
      
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
        
        {isPopupOpen && <TravelerPopup />}
      </div>

        <button className="search-btn">🔍</button>
    </div>

  )
}

export default SearchBar;