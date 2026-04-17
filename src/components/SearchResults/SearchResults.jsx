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

function SearchResults({ location, count, results }) {
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
