import AccommodationCard from '../components/AccommodationCard/AccommodationCard';
import styles from './MainPage.module.css';

function MainPage({ results = [], hasSearched = false }) {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>가까운 여행지, 에어비앤비에서 찾아보세요</h1>
        <p className={styles.heroSubtitle}>가까운 곳에서 새로운 경험을 즐기세요.</p>
      </section>

      {hasSearched && (
        <section className={styles.results}>
          <h2 className={styles.resultsTitle}>
            검색 결과 {results.length}건
          </h2>
          {results.length === 0 ? (
            <p className={styles.empty}>조건에 맞는 숙소가 없습니다.</p>
          ) : (
            <div className={styles.grid}>
              {results.map((item) => (
                <AccommodationCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default MainPage;
