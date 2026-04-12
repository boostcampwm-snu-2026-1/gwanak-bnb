import DestinationSuggestionItem from './DestinationSuggestionItem'
import styles from './SearchBar.module.css'

function DestinationDropdown({ mode, destinations, highlightedIndex, onHighlight, onSelectDestination }) {
  const isSearchMode = mode === 'search'
  const dropdownTitleId = 'destination-dropdown-title'

  return (
    <section
      className={styles.destinationDropdown}
      id="destination-dropdown"
      role="region"
      aria-label="여행지 추천 결과"
    >
      {!isSearchMode && (
        <h2 className={styles.dropdownTitle} id={dropdownTitleId}>
          추천 여행지
        </h2>
      )}
      <ul
        id="destination-dropdown-list"
        className={styles.suggestionList}
        role="listbox"
        aria-label={isSearchMode ? '검색된 여행지' : '추천 여행지'}
        aria-labelledby={!isSearchMode ? dropdownTitleId : undefined}
      >
        {destinations.map((destination, index) => (
          <DestinationSuggestionItem
            key={destination.id}
            destination={destination}
            mode={mode}
            optionId={`destination-option-${index}`}
            isHighlighted={highlightedIndex === index}
            onMouseEnter={() => onHighlight(index)}
            onSelect={onSelectDestination}
          />
        ))}
        {destinations.length === 0 && (
          <li className={styles.emptyResult}>검색 결과가 없습니다. 다른 여행지를 입력해보세요.</li>
        )}
      </ul>
    </section>
  )
}

export default DestinationDropdown
