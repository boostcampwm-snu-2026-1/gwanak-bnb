import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <p className={styles.kicker}>React + Vite</p>
        <h1>gwanak-bnb</h1>
        <p className={styles.description}>
          Airbnb 메인 화면을 참고해 검색 경험을 구현해보는 학습용 프로젝트입니다.
        </p>
      </section>
    </main>
  );
}

export default App;
