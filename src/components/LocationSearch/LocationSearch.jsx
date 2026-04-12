import { useState, useMemo, useEffect, useRef } from 'react'
import { popularDestinations, allDestinations } from '../../data/destinations'
import './LocationSearch.css'

function LocationSearch({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const listRef = useRef(null)

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

  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return
    const items = listRef.current.querySelectorAll('.search-result-item, .popular-item')
    if (items[highlightIndex]) {
      items[highlightIndex].scrollIntoView({ block: 'nearest' })
    }
  }, [highlightIndex])

  const handleKeyDown = (e) => {
    if (showRecommendations) {
      const total = popularDestinations.length
      if (total === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightIndex((prev) => (prev + 1) % total)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightIndex((prev) => (prev - 1 + total) % total)
      } else if (e.key === 'Enter' && highlightIndex >= 0) {
        e.preventDefault()
        const selected = popularDestinations[highlightIndex]
        onSelect(selected.name)
      } else if (e.key === 'Escape') {
        onClose()
      }
      return
    }

    const total = results.length
    if (total === 0) {
      if (e.key === 'Escape') onClose()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((prev) => (prev + 1) % total)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((prev) => (prev - 1 + total) % total)
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault()
      const selected = results[highlightIndex]
      onSelect(selected.name)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setHighlightIndex(-1)
  }

  return (
    <div className="location-search" ref={panelRef}>
      <div className="location-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="location-input"
          placeholder="여행지 검색"
          value={highlightIndex >= 0 && !showRecommendations && results[highlightIndex]
            ? results[highlightIndex].name
            : query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button className="clear-button" onClick={() => setQuery('')}>
            ✕
          </button>
        )}
      </div>

      <div className="location-results" ref={listRef}>
        {showRecommendations && (
          <>
            <p className="results-title">추천 여행지</p>
            {popularDestinations.map((dest, index) => (
              <button
                key={dest.id}
                className={`popular-item ${highlightIndex === index ? 'highlighted' : ''}`}
                onClick={() => onSelect(dest.name)}
                onMouseEnter={() => setHighlightIndex(index)}
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
          results.map((dest, index) => (
            <button
              key={dest.id}
              className={`search-result-item ${highlightIndex === index ? 'highlighted' : ''}`}
              onClick={() => onSelect(dest.name)}
              onMouseEnter={() => setHighlightIndex(index)}
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
