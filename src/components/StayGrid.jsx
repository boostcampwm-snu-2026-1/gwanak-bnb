import styles from "./StayGrid.module.css";

function StayGrid({ stays, isLoading, errorMessage, destinationValue }) {
  const hasDestination = destinationValue.trim().length > 0;

  if (isLoading) {
    return <p className={styles.message}>숙소 목록을 불러오는 중입니다...</p>;
  }

  if (errorMessage) {
    return <p className={styles.message}>{errorMessage}</p>;
  }

  if (stays.length === 0) {
    return (
      <p className={styles.message}>
        {hasDestination
          ? `"${destinationValue}"와 맞는 숙소가 아직 없어요. 다른 추천 여행 검색어를 선택해보세요.`
          : "표시할 숙소가 아직 없어요."}
      </p>
    );
  }

  return (
    <section className={styles.gridSection}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>
            {hasDestination ? "선택한 여행지 추천 숙소" : "추천 숙소"}
          </p>
          <h2>
            {hasDestination
              ? `${destinationValue}와 어울리는 숙소`
              : "지금 둘러보기 좋은 숙소"}
          </h2>
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
