import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          airbnb
        </a>

        <SearchBar />

        <div className={styles.userMenu}>
          <span className={styles.hostLink}>당신의 공간을 에어비앤비하세요</span>
          <button className={styles.profileButton}>
            <span className={styles.menuIcon}>☰</span>
            <span className={styles.profileIcon}>👤</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;