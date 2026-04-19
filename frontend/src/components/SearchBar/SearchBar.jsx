import { useEffect, useRef, useState } from 'react';
import DestinationSearch from '../DestinationSearch/DestinationSearch';
import GuestModal from '../GuestModal/GuestModal';
import './SearchBar.css';

function SearchBar({
  selectedDestination,
  onDestinationChange,
  guestSummary,
  guests,
  onGuestsChange,
  isLoading,
  onSearch,
}) {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const guestSectionRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        guestSectionRef.current &&
        !guestSectionRef.current.contains(event.target)
      ) {
        setIsGuestModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="search-bar">
      <div className="search-bar-shell">
        <DestinationSearch
          selectedDestination={selectedDestination}
          onSelect={onDestinationChange}
        />

        <span className="search-divider" aria-hidden="true" />

        <button type="button" className="search-section search-section-button">
          <span className="search-title">날짜</span>
          <span className="search-value search-value-muted">날짜 추가</span>
        </button>

        <span className="search-divider" aria-hidden="true" />

        <div className="search-section search-guest-section" ref={guestSectionRef}>
          <button
            type="button"
            className="search-section-button search-guest-trigger"
            onClick={() => setIsGuestModalOpen((prev) => !prev)}
          >
            <span className="search-title">여행자</span>
            <span className="search-value">{guestSummary}</span>
          </button>

          {isGuestModalOpen && (
            <div className="search-popover">
              <GuestModal guests={guests} onGuestsChange={onGuestsChange} />
            </div>
          )}
        </div>

        <button
          type="button"
          className="search-button"
          aria-label="검색"
          disabled={isLoading}
          onClick={onSearch}
        >
          <span className="search-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
