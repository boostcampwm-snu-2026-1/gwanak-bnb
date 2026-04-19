import { useState } from "react";
import GuestSelector from "./GuestSelector";
import DestinationSelector from "./DestinationSelector";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState(null);
  const [totalGuests, setTotalGuests] = useState(0);

  const handleSearch = () => {
    if (onSearch && destination) {
      onSearch({
        location: destination.name,
        guests: totalGuests,
      });
    }
  };

  return (
    <div className={styles.searchBar}>
      <DestinationSelector onDestinationChange={setDestination} />

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.fieldLabel}>When</span>
        <span className={styles.fieldValue}>Add dates</span>
      </div>

      <div className={styles.divider} />

      <GuestSelector onGuestsChange={setTotalGuests} />

      <button className={styles.searchButton} onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
