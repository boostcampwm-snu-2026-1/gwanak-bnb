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

        <button className={styles.menuButton}>
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
