import { useState } from 'react'
import { useSearchDestinations } from '../../hooks'
import SearchInput from './SearchInput'
import SearchDropdown from './SearchDropdown'
import Button from '../atoms/Button'

export default function SearchBar({ onSearch, guestCount = 0 }) {
  const [selectedDestination, setSelectedDestination] = useState('')

  const {
    searchQuery,
    isOpen,
    highlightedIndex,
    filteredResults,
    allDestinations,
    containerRef,
    inputRef,
    handleKeyDown,
    handleSelect,
    handleInputChange,
    openDropdown,
  } = useSearchDestinations()

  const handleSelectWithCallback = (name) => {
    handleSelect(name)
    setSelectedDestination(name)
  }

  const handleSearch = () => {
    onSearch?.(selectedDestination || searchQuery, guestCount)
  }

  return (
    <div ref={containerRef} className="relative flex-1 flex items-center gap-2">
      <div className="flex-1">
        <SearchInput
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={openDropdown}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        <SearchDropdown
          isOpen={isOpen}
          query={searchQuery}
          results={filteredResults}
          allDestinations={allDestinations}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelectWithCallback}
        />
      </div>
      <Button size="sm" onClick={handleSearch}>검색</Button>
    </div>
  )
}
