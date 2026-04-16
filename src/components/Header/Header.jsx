import { useState } from 'react';
import LogoIcon from '../../assets/icons/LogoIcon';
import styles from './Header.module.css';

const TABS = ['숙소', '체험', '서비스'];

function Header() {
  const [activeTab, setActiveTab] = useState('숙소');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoWrapper}>
          <LogoIcon />
          <span className={styles.logoText}>gwanakbnb</span>
        </div>

        <nav className={styles.nav}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className={styles.spacer} />
      </div>
    </header>
  );
}

export default Header;
