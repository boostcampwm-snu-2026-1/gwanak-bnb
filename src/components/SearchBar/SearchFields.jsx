import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField'
import styles from './SearchBar.module.css'

function SearchFields({
  isDestinationOpen,
  destinationInput,
  activeOptionId,
  onDestinationFieldActivate,
  onDestinationInputChange,
  onDestinationInputClear,
  onDestinationInputKeyDown,
  guestSummary,
  isGuestModalOpen,
  onGuestFieldToggle,
}) {
  return (
    <div className={styles.searchBar}>
      <DestinationField
        isActive={isDestinationOpen}
        value={destinationInput}
        activeOptionId={activeOptionId}
        onActivate={onDestinationFieldActivate}
        onChange={onDestinationInputChange}
        onClear={onDestinationInputClear}
        onKeyDown={onDestinationInputKeyDown}
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
