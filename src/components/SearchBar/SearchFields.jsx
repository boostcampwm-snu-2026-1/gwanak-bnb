import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField'
import styles from './SearchBar.module.css'

function SearchFields({
  isDestinationOpen,
  destinationInput,
  onDestinationFieldActivate,
  onDestinationInputChange,
  onDestinationInputClear,
  guestSummary,
  isGuestModalOpen,
  onGuestFieldToggle,
}) {
  return (
    <div className={styles.searchBar}>
      <DestinationField
        isActive={isDestinationOpen}
        value={destinationInput}
        onActivate={onDestinationFieldActivate}
        onChange={onDestinationInputChange}
        onClear={onDestinationInputClear}
      />
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
