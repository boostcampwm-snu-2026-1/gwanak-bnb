import { useState, useMemo, useEffect, useRef } from 'react'
import { popularDestinations, allDestinations } from '../../data/destinations'
import './LocationSearch.css'

function LocationSearch({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const showRecommendations = query.trim() === ''

  const filteredResults = useMemo(() => {
    if (query.trim() === '') return []
    const keyword = query.trim().toLowerCase()
    return allDestinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(keyword) ||
        dest.description.toLowerCase().includes(keyword)
    )
  }, [query])

  const results = showRecommendations ? [] : filteredResults

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

        {!showRecommendations && results.length > 0 && (
          results.map((dest) => (
            <button
              key={dest.id}
              className="search-result-item"
              onClick={() => onSelect(dest.name)}
            >
              <span className="result-icon">📍</span>
              <div className="result-info">
                <span className="result-name">{dest.name}</span>
                <span className="result-description">{dest.description}</span>
              </div>
            </button>
          ))
        )}

        {!showRecommendations && results.length === 0 && (
          <p className="no-results">검색 결과가 없습니다</p>
        )}
      </div>
    </div>
  )
}

export default LocationSearch
