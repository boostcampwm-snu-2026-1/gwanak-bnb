import { useState, useEffect, useRef } from 'react'
import destinations from '../data/destinations'

export function useSearchDestinations() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const filteredResults = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeList = searchQuery ? filteredResults : destinations

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleMouseDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isOpen])

  const handleSelect = (name) => {
    setSearchQuery(name)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = (highlightedIndex + 1) % activeList.length
      setHighlightedIndex(newIndex)
      setSearchQuery(activeList[newIndex].name)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = (highlightedIndex - 1 + activeList.length) % activeList.length
      setHighlightedIndex(newIndex)
      setSearchQuery(activeList[newIndex].name)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && activeList[highlightedIndex]) {
        handleSelect(activeList[highlightedIndex].name)
      } else {
        setIsOpen(false)
      }
    }
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  return {
    searchQuery,
    isOpen,
    highlightedIndex,
    filteredResults,
    allDestinations: destinations,
    containerRef,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleInputChange,
    openDropdown: () => setIsOpen(true),
  }
}
