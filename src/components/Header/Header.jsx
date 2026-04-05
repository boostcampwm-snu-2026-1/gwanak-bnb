import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>airbnb</div>

      <nav className={styles.mainTabs}>
        <button className={`${styles.tab} ${styles.active}`} type="button">
          <span aria-hidden="true">🏠</span>
          숙소
        </button>
        <button className={styles.tab} type="button">
          <span aria-hidden="true">🎈</span>
          체험
        </button>
        <button className={styles.tab} type="button">
          <span aria-hidden="true">🛎️</span>
          서비스
        </button>
      </nav>

      <div className={styles.actions}>
        <button type="button" className={styles.hostingButton}>
          호스팅 하기
        </button>
        <button type="button" className={styles.circleButton} aria-label="언어 설정">
          🌐
        </button>
        <button type="button" className={styles.circleButton} aria-label="메뉴 열기">
          ☰
        </button>
      </div>
    </header>
  )
}

export default Header
