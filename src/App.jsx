import { useEffect, useState } from "react";
import StayGrid from "./components/StayGrid";
import styles from "./App.module.css";

function App() {
  const [stays, setStays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStays() {
      try {
        setIsLoading(true);
        const response = await fetch("/data/stays.json");

        if (!response.ok) {
          throw new Error("숙소 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();

        if (isMounted) {
          setStays(data.stays);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStays();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <h1>마음에 드는 숙소를 찾아보세요.</h1>
          <p className={styles.description}>
            Airbnb 메인 화면을 참고해 숙소 탐색 경험을 연습하는 React
            프로젝트입니다.
          </p>
        </div>
      </header>

      <main className={styles.content}>
        <StayGrid
          stays={stays}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </main>
    </div>
  );
}

export default App;
