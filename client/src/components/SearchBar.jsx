import { useState } from "react";
import GuestSelector from "./GuestSelector";
import DestinationSelector from "./DestinationSelector";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState(null);
  const [totalGuests, setTotalGuests] = useState(0);
  const [closeSignal, setCloseSignal] = useState(0);

  const handleSearch = () => {
    setCloseSignal((c) => c + 1);
    if (!onSearch) return;
    onSearch({
      location: destination?.name || "",
      guests: totalGuests,
    });
  };

  return (
    <div className={styles.searchBar}>
      <DestinationSelector
        onDestinationChange={setDestination}
        closeSignal={closeSignal}
      />

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.fieldLabel}>When</span>
        <span className={styles.fieldValue}>Add dates</span>
      </div>

      <div className={styles.divider} />

      <GuestSelector
        onGuestsChange={setTotalGuests}
        closeSignal={closeSignal}
      />

      <button className={styles.searchButton} onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
