import { useState } from 'react'
import {
  GuestPickerModal,
  formatGuestSummary,
  type GuestCounts,
} from './components/GuestPickerModal'
import './App.css'

const initialGuests: GuestCounts = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [guests, setGuests] = useState<GuestCounts>(initialGuests)

  return (
    <div className="app-demo">
      <div className="search-bar-mock" data-testid="search-bar-mock">
        <div className="search-bar-mock-cell search-bar-mock-cell--grow">
          <span className="search-bar-mock-kicker">여행지</span>
          <span className="search-bar-mock-value search-bar-mock-value--muted">
            여행지 검색
          </span>
        </div>
        <div className="search-bar-mock-divider" aria-hidden />
        <div className="search-bar-mock-cell">
          <span className="search-bar-mock-kicker">날짜</span>
          <span className="search-bar-mock-value search-bar-mock-value--muted">
            날짜 추가
          </span>
        </div>
        <div className="search-bar-mock-divider" aria-hidden />
        <button
          type="button"
          className="search-bar-mock-cell search-bar-mock-cell--button"
          onClick={() => setModalOpen(true)}
          aria-expanded={modalOpen}
          aria-haspopup="dialog"
        >
          <span className="search-bar-mock-kicker">여행자</span>
          <span className="search-bar-mock-value">
            {formatGuestSummary(guests)}
          </span>
        </button>
        <button
          type="button"
          className="search-bar-mock-search"
          aria-label="검색"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            aria-hidden
          >
            <path d="m20.666 20.666 10 10" />
            <path d="m24.0002 12.6668c0 6.2593-5.0741 11.3334-11.3334 11.3334-6.2592 0-11.3333-5.0741-11.3333-11.3334 0-6.2592 5.0741-11.3333 11.3333-11.3333 6.2593 0 11.3334 5.0741 11.3334 11.3333z" />
          </svg>
        </button>
      </div>

      <GuestPickerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        value={guests}
        onChange={setGuests}
      />
    </div>
  )
}

export default App
