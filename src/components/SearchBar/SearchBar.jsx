import { useState } from 'react'
import GuestSelector from '../GuestSelector/GuestSelector'
import './SearchBar.css'

function SearchBar() {
  const [isGuestOpen, setIsGuestOpen] = useState(false)
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const totalGuests = guests.adults + guests.children
  const guestText =
    totalGuests > 0
      ? `게스트 ${totalGuests}명${guests.infants > 0 ? `, 유아 ${guests.infants}명` : ''}${guests.pets > 0 ? `, 반려동물 ${guests.pets}마리` : ''}`
      : '게스트 추가'

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <button className="search-field">
          <span className="field-label">여행지</span>
          <span className="field-value placeholder">여행지 검색</span>
        </button>
        <span className="divider" />
        <button className="search-field">
          <span className="field-label">체크인</span>
          <span className="field-value placeholder">날짜 추가</span>
        </button>
        <span className="divider" />
        <button className="search-field">
          <span className="field-label">체크아웃</span>
          <span className="field-value placeholder">날짜 추가</span>
        </button>
        <span className="divider" />
        <button
          className={`search-field guest-field ${isGuestOpen ? 'active' : ''}`}
          onClick={() => setIsGuestOpen(!isGuestOpen)}
        >
          <div className="guest-field-text">
            <span className="field-label">여행자</span>
            <span className={`field-value ${totalGuests === 0 ? 'placeholder' : ''}`}>
              {guestText}
            </span>
          </div>
          <span className="search-icon">🔍</span>
        </button>
      </div>

      {isGuestOpen && (
        <GuestSelector
          guests={guests}
          setGuests={setGuests}
          onClose={() => setIsGuestOpen(false)}
        />
      )}
    </div>
  )
}

export default SearchBar
