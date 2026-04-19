import styles from "./SearchResults.module.css";

function SearchResults({ results, isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>검색 중...</div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <p>검색 결과가 없습니다.</p>
          <p>다른 여행지나 게스트 수로 검색해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>검색 결과: {results.length}개의 숙소</h2>
      <div className={styles.grid}>
        {results.map((lodging) => (
          <div key={lodging._id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={lodging.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a850613994a?w=800"}
                alt={lodging.title}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.header}>
                <span className={styles.location}>{lodging.location}</span>
                <span className={styles.rating}>★ {lodging.rating}</span>
              </div>
              <h3 className={styles.lodgingTitle}>{lodging.title}</h3>
              <p className={styles.description}>{lodging.description}</p>
              <div className={styles.details}>
                <span>최대 {lodging.maxGuests}명</span>
                <span>침대 {lodging.beds}개</span>
              </div>
              <div className={styles.price}>
                <span className={styles.priceValue}>₩{lodging.price?.toLocaleString()}</span>
                <span className={styles.priceUnit}>/박</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;