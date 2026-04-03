import { useState, useRef, useEffect } from 'react';
import GuestSelector from './GuestSelector';
import './Header.css';

export default function Header() {
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });
  const guestRef = useRef(null);

  const totalGuests = guests.adults + guests.children;
  const guestText = totalGuests > 0
    ? `게스트 ${totalGuests}명${guests.infants > 0 ? `, 유아 ${guests.infants}명` : ''}`
    : '게스트 추가';

  useEffect(() => {
    function handleClickOutside(e) {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuests(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#FF385C">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415c0 2.456-1.59 4.706-4.501 4.706-1.778 0-3.39-.882-5.169-2.592l-.573-.566c-.376-.381-.72-.747-1.042-1.098l-.2-.22-.163-.188-.544.597c-.39.42-.816.856-1.293 1.323l-.487.467C13.566 27.118 11.954 28 10.176 28c-2.911 0-4.501-2.25-4.501-4.706 0-1.12.256-2.134.97-3.811l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C15.711 1.963 16.992 1 16 1z"/>
          </svg>
          <span>gwanak-bnb</span>
        </div>

        <div className="search-bar">
          <button className="search-field">
            <span className="search-label">어디든지</span>
          </button>
          <span className="divider" />
          <button className="search-field">
            <span className="search-label">언제든 일주일</span>
          </button>
          <span className="divider" />
          <div className="guest-field-wrapper" ref={guestRef}>
            <button
              className={`search-field guest-field ${showGuests ? 'active' : ''}`}
              onClick={() => setShowGuests(!showGuests)}
            >
              <span className={`search-label ${totalGuests > 0 ? 'has-guests' : 'placeholder'}`}>
                {guestText}
              </span>
            </button>
            {showGuests && (
              <GuestSelector guests={guests} setGuests={setGuests} />
            )}
          </div>
          <button className="search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <div className="header-right">
          <button className="host-btn">당신의 공간을 에어비앤비하세요</button>
          <button className="profile-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#717171">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 10-16 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
