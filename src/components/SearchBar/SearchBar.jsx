import { useState } from 'react'
import GuestSelector from '../GuestSelector/GuestSelector'
import LocationSearch from '../LocationSearch/LocationSearch'
import { searchAccommodations } from '../../api/accommodations'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [isGuestOpen, setIsGuestOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const totalGuests = guests.adults + guests.children
  const guestText =
    totalGuests > 0
      ? `게스트 ${totalGuests}명${guests.infants > 0 ? `, 유아 ${guests.infants}명` : ''}${guests.pets > 0 ? `, 반려동물 ${guests.pets}마리` : ''}`
      : '게스트 추가'

  const handleLocationClick = () => {
    setIsLocationOpen(!isLocationOpen)
    setIsGuestOpen(false)
  }

  const handleGuestClick = () => {
    setIsGuestOpen(!isGuestOpen)
    setIsLocationOpen(false)
  }

  const handleLocationSelect = (name) => {
    setSelectedLocation(name)
    setIsLocationOpen(false)
    setErrorMessage('')
  }

  const handleSearch = async () => {
    if (!selectedLocation) {
      setErrorMessage('여행지를 선택해주세요')
      return
    }
    if (totalGuests < 1) {
      setErrorMessage('여행 인원을 선택해주세요')
      return
    }
    setErrorMessage('')
    setIsSearching(true)
    try {
      const data = await searchAccommodations({
        location: selectedLocation,
        guests: totalGuests,
      })
      onSearch?.({
        location: selectedLocation,
        guests: totalGuests,
        results: data.results ?? [],
        count: data.count ?? 0,
      })
    } catch (err) {
      setErrorMessage(err.message || '검색 중 오류가 발생했습니다')
      onSearch?.({
        location: selectedLocation,
        guests: totalGuests,
        results: [],
        count: 0,
        error: true,
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <button
          className={`search-field ${isLocationOpen ? 'active' : ''}`}
          onClick={handleLocationClick}
        >
          <span className="field-label">여행지</span>
          <span className={`field-value ${selectedLocation ? '' : 'placeholder'}`}>
            {selectedLocation || '여행지 검색'}
          </span>
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
          onClick={handleGuestClick}
        >
          <div className="guest-field-text">
            <span className="field-label">여행자</span>
            <span className={`field-value ${totalGuests === 0 ? 'placeholder' : ''}`}>
              {guestText}
            </span>
          </div>
        </button>
        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
          disabled={isSearching}
          aria-label="검색"
        >
          <span className="search-icon">🔍</span>
        </button>
      </div>

      {errorMessage && <p className="search-error">{errorMessage}</p>}

      {isLocationOpen && (
        <LocationSearch
          onSelect={handleLocationSelect}
          onClose={() => setIsLocationOpen(false)}
        />
      )}

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
