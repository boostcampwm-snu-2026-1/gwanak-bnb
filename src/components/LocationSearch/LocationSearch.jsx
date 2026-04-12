import { useState, useEffect, useRef } from 'react'
import { popularDestinations } from '../../data/destinations'
import './LocationSearch.css'

function LocationSearch({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const showRecommendations = query.trim() === ''

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="location-search" ref={panelRef}>
      <div className="location-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="location-input"
          placeholder="여행지 검색"
          value={query}
          onChange={handleInputChange}
        />
        {query && (
          <button className="clear-button" onClick={() => setQuery('')}>
            ✕
          </button>
        )}
      </div>

      <div className="location-results">
        {showRecommendations && (
          <>
            <p className="results-title">추천 여행지</p>
            {popularDestinations.map((dest) => (
              <button
                key={dest.id}
                className="popular-item"
                onClick={() => onSelect(dest.name)}
              >
                <span className="popular-icon">{dest.icon}</span>
                <div className="popular-info">
                  <span className="popular-name">{dest.name}</span>
                  <span className="popular-region">{dest.region} · {dest.type}</span>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default LocationSearch
