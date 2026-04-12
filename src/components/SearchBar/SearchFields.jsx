import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField'
import styles from './SearchBar.module.css'

function SearchFields({ guestSummary, isGuestModalOpen, onGuestFieldToggle }) {
  return (
    <div className={styles.searchBar}>
      <DestinationField />
      <DateField />
      <GuestField
        guestSummary={guestSummary}
        isGuestModalOpen={isGuestModalOpen}
        onToggle={onGuestFieldToggle}
      />
    </div>
  )
}

export default SearchFields
