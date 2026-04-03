import styles from "./StayGrid.module.css";

function StayGrid({ stays, isLoading, errorMessage }) {
  if (isLoading) {
    return <p className={styles.message}>숙소 목록을 불러오는 중입니다...</p>;
  }

  if (errorMessage) {
    return <p className={styles.message}>{errorMessage}</p>;
  }

  return (
    <section className={styles.gridSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>추천 숙소</p>
          <h2>지금 둘러보기 좋은 숙소</h2>
        </div>
      </div>

      <div className={styles.grid}>
        {stays.map((stay) => (
          <article key={stay.id} className={styles.card}>
            <div
              className={styles.thumbnail}
              style={{ background: stay.gradient }}
              aria-hidden="true"
            >
              <span className={styles.badge}>{stay.badge}</span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardTopRow}>
                <h3>{stay.title}</h3>
                <span className={styles.rating}>★ {stay.rating}</span>
              </div>
              <p>{stay.location}</p>
              <p>{stay.distance}</p>
              <p>{stay.dates}</p>
              <strong>{stay.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StayGrid;

