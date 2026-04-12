import GuestSelector from '../GuestSelector/GuestSelector';
import LocationInput from '../LocationInput/LocationInput';
import SearchIcon from '../../assets/icons/SearchIcon';
import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <LocationInput />
      <div className={styles.divider} />
      <div className={styles.field}>
        <span className={styles.label}>날짜</span>
        <span className={styles.value}>날짜 추가</span>
      </div>
      <div className={styles.divider} />
      <GuestSelector />
      <button className={styles.searchButton}>
        <SearchIcon />
        검색
      </button>
    </div>
  );
}

export default SearchBar;
