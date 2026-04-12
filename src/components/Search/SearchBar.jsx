import { useSearchDestinations } from '../../hooks'
import SearchInput from './SearchInput'
import SearchDropdown from './SearchDropdown'

export default function SearchBar({ onSearch }) {
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
    onSearch?.(name)
  }

  return (
    <div ref={containerRef} className="relative flex-1">
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
  )
}
