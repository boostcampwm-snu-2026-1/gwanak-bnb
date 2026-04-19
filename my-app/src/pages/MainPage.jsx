import styles from './MainPage.module.css';

function MainPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>가까운 여행지, 에어비앤비에서 찾아보세요</h1>
        <p className={styles.heroSubtitle}>가까운 곳에서 새로운 경험을 즐기세요.</p>
      </section>
    </main>
  );
}

export default MainPage;