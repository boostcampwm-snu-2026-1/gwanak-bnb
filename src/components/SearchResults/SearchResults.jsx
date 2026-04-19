import AccommodationCard from '../AccommodationCard/AccommodationCard'
import './SearchResults.css'

function normalize(result) {
  return {
    id: result._id,
    title: result.title,
    location: [result.location?.city, result.location?.region].filter(Boolean).join(' · '),
    distance: result.location?.fullAddress ?? '',
    dates: '',
    price: result.pricePerNight,
    rating: result.rating,
    image: result.images?.[0],
  }
}

function SearchResults({ location, count, results, error }) {
  if (error) {
    return (
      <section className="search-results">
        <div className="search-results-empty">
          <p className="search-results-empty-title">검색에 실패했습니다</p>
          <p className="search-results-empty-description">
            잠시 후 다시 시도해주세요.
          </p>
        </div>
      </section>
    )
  }

  if (count === 0) {
    return (
      <section className="search-results">
        <div className="search-results-empty">
          <p className="search-results-empty-title">검색 결과가 없습니다</p>
          <p className="search-results-empty-description">
            &apos;{location}&apos;에 해당하는 숙소를 찾지 못했어요. 다른 조건으로 검색해보세요.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="search-results">
      <h2 className="search-results-title">
        {location} 숙소 {count.toLocaleString()}개
      </h2>
      <div className="search-results-grid">
        {results.map((result) => (
          <AccommodationCard key={result._id} accommodation={normalize(result)} />
        ))}
      </div>
    </section>
  )
}

export default SearchResults
