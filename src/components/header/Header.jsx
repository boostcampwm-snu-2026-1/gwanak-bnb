import SearchBar from '../search/SearchBar';
import styles from './Header.module.css';

export default function Header({ searchFilters, onSearch }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#FF385C">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415c0 2.456-1.59 4.706-4.501 4.706-1.778 0-3.39-.882-5.169-2.592l-.573-.566c-.376-.381-.72-.747-1.042-1.098l-.2-.22-.163-.188-.544.597c-.39.42-.816.856-1.293 1.323l-.487.467C13.566 27.118 11.954 28 10.176 28c-2.911 0-4.501-2.25-4.501-4.706 0-1.12.256-2.134.97-3.811l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C15.711 1.963 16.992 1 16 1z"/>
          </svg>
          <span>gwanak-bnb</span>
        </div>

        <SearchBar searchFilters={searchFilters} onSearch={onSearch} />

        <div className={styles.right}>
          <button className={styles.hostBtn}>당신의 공간을 에어비앤비하세요</button>
          <button className={styles.profileBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#717171">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 10-16 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
