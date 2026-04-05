import GuestSelector from "./GuestSelector";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.field}>
        <span className={styles.fieldLabel}>Where</span>
        <input
          className={styles.fieldInput}
          type="text"
          placeholder="Search destinations"
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <span className={styles.fieldLabel}>When</span>
        <span className={styles.fieldValue}>Add dates</span>
      </div>

      <div className={styles.divider} />

      <GuestSelector />

      <button className={styles.searchButton}>🔍</button>
    </div>
  );
}

export default SearchBar;
