import DestinationSuggestionItem from './DestinationSuggestionItem'
import styles from './SearchBar.module.css'

function DestinationDropdown({ mode, destinations, onSelectDestination }) {
  const isSearchMode = mode === 'search'

  return (
    <section className={styles.destinationDropdown} id="destination-dropdown">
      {!isSearchMode && <h2 className={styles.dropdownTitle}>추천 여행지</h2>}
      <ul
        className={styles.suggestionList}
        role="listbox"
        aria-label={isSearchMode ? '검색된 여행지' : '추천 여행지'}
      >
        {destinations.map((destination) => (
          <DestinationSuggestionItem
            key={destination.id}
            destination={destination}
            mode={mode}
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
