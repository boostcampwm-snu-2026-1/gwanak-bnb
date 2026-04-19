import './AccommodationResults.css';

function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(price);
}

function AccommodationResults({
  accommodations,
  destination,
  isLoading,
  errorMessage,
  hasSearched,
}) {
  if (!hasSearched) {
    return (
      <section className="results-empty-state">
        <p className="results-eyebrow">검색 결과 대기 중</p>
        <h2>여행지와 여행자를 선택하고 검색해보세요.</h2>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="results-empty-state">
        <p className="results-eyebrow">검색 중</p>
        <h2>조건에 맞는 숙소를 찾고 있어요.</h2>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="results-empty-state results-error">
        <p className="results-eyebrow">검색 실패</p>
        <h2>{errorMessage}</h2>
      </section>
    );
  }

  if (accommodations.length === 0) {
    return (
      <section className="results-empty-state">
        <p className="results-eyebrow">검색 결과 없음</p>
        <h2>{destination} 조건에 맞는 숙소가 아직 없어요.</h2>
      </section>
    );
  }

  return (
    <section className="accommodation-results">
      <div className="results-header">
        <p className="results-eyebrow">검색 결과</p>
        <h2>{destination}의 숙소 {accommodations.length}개</h2>
      </div>

      <div className="accommodation-grid">
        {accommodations.map((accommodation) => (
          <article className="accommodation-card" key={accommodation._id}>
            <div className="accommodation-image-wrap">
              <img
                className="accommodation-image"
                src={accommodation.imageUrl}
                alt={accommodation.title}
              />
              {accommodation.badges?.[0] && (
                <span className="accommodation-badge">
                  {accommodation.badges[0]}
                </span>
              )}
            </div>

            <div className="accommodation-card-body">
              <div className="accommodation-title-row">
                <h3>{accommodation.title}</h3>
                <span className="accommodation-rating">
                  ★ {accommodation.rating.toFixed(2)}
                </span>
              </div>
              <p className="accommodation-description">
                {accommodation.description}
              </p>
              <p className="accommodation-meta">
                {accommodation.locationLabel} · 침실 {accommodation.bedroomCount}
                개 · 침대 {accommodation.bedCount}개 · 최대{' '}
                {accommodation.maxGuests}명
              </p>
              <p className="accommodation-price">
                <strong>{formatPrice(accommodation.price)}</strong>
                <span> / 박</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AccommodationResults;
