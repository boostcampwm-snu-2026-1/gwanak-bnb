import styles from "./SearchResults.module.css";

function SearchResults({ results, isLoading, searchedLocation }) {
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
          <p>숙소가 없습니다.</p>
          <p>다른 여행지나 게스트 수로 검색해보세요.</p>
        </div>
      </div>
    );
  }

  const headingLocation = searchedLocation || results[0]?.location || "";

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {headingLocation}의 숙소 {results.length.toLocaleString()}개 이상
      </h2>
      <div className={styles.grid}>
        {results.map((lodging) => (
          <div key={lodging._id} className={styles.card}>
            <div className={styles.imageContainer}>
              <span className={styles.badge}>게스트 선호</span>
              <button className={styles.favorite} aria-label="찜">
                <svg viewBox="0 0 32 32" width="24" height="24">
                  <path
                    d="M16 28.7c-.3 0-.6-.1-.8-.3-.4-.3-9.8-8-9.8-14.9 0-3.9 3.1-7 7-7 1.4 0 2.7.4 3.8 1.2.3.2.7.5 1 .8.3-.3.7-.6 1-.8 1.1-.8 2.4-1.2 3.8-1.2 3.9 0 7 3.1 7 7 0 6.9-9.4 14.6-9.8 14.9-.2.2-.5.3-.8.3z"
                    fill="rgba(0,0,0,0.5)"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <img
                src={lodging.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a850613994a?w=800"}
                alt={lodging.title}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.headerRow}>
                <span className={styles.lodgingTitle}>{lodging.title}</span>
                <span className={styles.rating}>
                  ★ {lodging.rating} ({lodging.reviewCount})
                </span>
              </div>
              <p className={styles.subText}>{lodging.address || lodging.description}</p>
              <p className={styles.subText}>
                침실 {lodging.bedrooms}개 · 침대 {lodging.beds}개
              </p>
              <p className={styles.subText}>최대 {lodging.maxGuests}명</p>
              <p className={styles.priceLine}>
                <span className={styles.priceLabel}>총액</span>{" "}
                <span className={styles.priceValue}>
                  ₩{lodging.price?.toLocaleString()}
                </span>
              </p>
              <p className={styles.feeNote}>오늘 ₩0 결제 · 취소 수수료 없음</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
