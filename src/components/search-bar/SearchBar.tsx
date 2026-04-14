import {
  formatGuestSummary,
  type GuestCounts,
} from '../guestPickerUtils'
import { DestinationField } from './DestinationField'
import './SearchBar.css'

export type SearchBarProps = {
  guests: GuestCounts
  onGuestsOpen: () => void
  guestPickerOpen: boolean
}

export function SearchBar({
  guests,
  onGuestsOpen,
  guestPickerOpen,
}: SearchBarProps) {
  return (
    <div className="search-bar-mock" data-testid="search-bar-mock">
      <DestinationField />
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
        onClick={onGuestsOpen}
        aria-expanded={guestPickerOpen}
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
  )
}
