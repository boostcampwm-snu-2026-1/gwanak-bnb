import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField'
import styles from './SearchBar.module.css'

function SearchFields({
  isDestinationOpen,
  onDestinationFieldClick,
  guestSummary,
  isGuestModalOpen,
  onGuestFieldToggle,
}) {
  return (
    <div className={styles.searchBar}>
      <DestinationField isActive={isDestinationOpen} onClick={onDestinationFieldClick} />
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
