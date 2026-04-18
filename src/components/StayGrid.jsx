import styles from "./StayGrid.module.css";

function StayGrid({
  stays,
  isLoading,
  errorMessage,
  hasSearched,
  destinationValue,
}) {
  const hasDestination = destinationValue.trim().length > 0;

  if (isLoading) {
    return <p className={styles.message}>숙소 목록을 불러오는 중입니다...</p>;
  }

  if (errorMessage) {
    return <p className={styles.message}>{errorMessage}</p>;
  }

  if (!hasSearched) {
    return (
      <section className={styles.emptyState}>
        <p className={styles.eyebrow}>검색 결과 전</p>
        <h2>원격 DB 검색 결과가 여기에 바로 표시됩니다.</h2>
        <p className={styles.emptyDescription}>
          여행지와 여행 인원을 입력한 뒤 검색을 누르면 페이지 이동 없이 하단에
          결과가 렌더링됩니다.
        </p>
      </section>
    );
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
            {hasDestination ? "검색 결과" : "숙소 검색 결과"}
          </p>
          <h2>
            {hasDestination ? `${destinationValue}에서 찾은 숙소` : "조건에 맞는 숙소"}
          </h2>
        </div>
        <strong className={styles.resultCount}>{stays.length}개 숙소</strong>
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
              <p className={styles.summary}>{stay.summary}</p>
              <p>{stay.location}</p>
              <p>{stay.distance}</p>
              <p>{stay.stayInfo}</p>
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
