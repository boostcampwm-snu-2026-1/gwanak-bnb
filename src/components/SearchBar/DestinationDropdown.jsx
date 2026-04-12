import DestinationSuggestionItem from './DestinationSuggestionItem'
import styles from './SearchBar.module.css'

function DestinationDropdown({ destinations }) {
  return (
    <section className={styles.destinationDropdown} id="destination-dropdown">
      <h2 className={styles.dropdownTitle}>추천 여행지</h2>
      <ul className={styles.suggestionList} role="listbox" aria-label="추천 여행지">
        {destinations.map((destination) => (
          <DestinationSuggestionItem key={destination.id} destination={destination} />
        ))}
      </ul>
    </section>
  )
}

export default DestinationDropdown
