import { useState } from 'react'
import GuestPopup from './GuestPopup'
import './SearchBar.css'


export default function SearchBar() {
  const [isGuestOpen, setIsGuestOpen] = useState(false)

  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  const handleIncrease = (type) => {
    switch (type) {
      case 'adults':
        setAdults(adults + 1)
        break
      case 'children':
        setChildren(children + 1)
        break
      case 'infants':
        setInfants(infants + 1)
        break
      case 'pets':
        setPets(pets + 1)
        break
      default:
        break
    }
  }

  const handleDecrease = (type) => {
    switch (type) {
      case 'adults':
        setAdults(Math.max(0, adults - 1))
        break
      case 'children':
        setChildren(Math.max(0, children - 1))
        break
      case 'infants':
        setInfants(Math.max(0, infants - 1))
        break
      case 'pets':
        setPets(Math.max(0, pets - 1))
        break
      default:
        break
    }
  }
  
  return <section className="search-bar">
    <div className="search-bar__section">
      <p className="search-bar__label">여행지</p>
      <p className="search-bar__value">여행지 검색</p>
    </div>

    <div className="search-bar__divider" /> 
    
    <div className="search-bar__section">
      <p className="search-bar__label">날짜</p>
      <p className="search-bar__value">날짜 추가</p>
    </div>

    <div className="search-bar__divider" />
    <div className="guest-wrapper">
      <div 
        className="search-bar__section search-bar__section--guest"
        onClick={() => setIsGuestOpen(!isGuestOpen)}
      >
        <div className="search-bar__text">
            <p className="search-bar__label">여행자</p>
            <p className="search-bar__value">게스트 추가</p>
        </div>
      </div>

      <button type="button" className="search-bar__button" aria-label="검색">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
      {isGuestOpen && (
        <GuestPopup
        adults={adults}
        children={children}
        infants={infants}
        pets={pets}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        />
      )}
    </div>
  </section>
}