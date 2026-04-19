import ListingCard from './ListingCard'
import styles from './SearchResultsSection.module.css'

function SearchResultsSection({ listings, filters, isLoading, errorMessage }) {
  const destinationText = filters?.destination || '검색 결과'
  const title = `${destinationText} 숙소 ${listings.length}개`

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>검색 결과</p>
        <h2 className={styles.title}>{title}</h2>
        {filters && (
          <p className={styles.summary}>
            여행지 {filters.destination} · 게스트 {filters.guestCount}명
          </p>
        )}
      </div>

      {isLoading && <p className={styles.message}>검색 결과를 불러오는 중입니다.</p>}
      {!isLoading && errorMessage && <p className={styles.message}>{errorMessage}</p>}
      {!isLoading && !errorMessage && listings.length === 0 && (
        <p className={styles.message}>조건에 맞는 숙소가 아직 없어요. 다른 여행지나 인원으로 다시 검색해보세요.</p>
      )}

      {!isLoading && !errorMessage && listings.length > 0 && (
        <div className={styles.grid}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  )
}

export default SearchResultsSection
