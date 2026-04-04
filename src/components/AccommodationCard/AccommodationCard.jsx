import './AccommodationCard.css'

function AccommodationCard({ accommodation }) {
  const { title, location, distance, dates, price, rating, image } = accommodation

  return (
    <article className="card">
      <div className="card-image-wrapper">
        <img className="card-image" src={image} alt={title} loading="lazy" />
        <button className="card-wishlist" aria-label="위시리스트에 추가">
          ♡
        </button>
      </div>
      <div className="card-info">
        <div className="card-header">
          <h3 className="card-location">{location}</h3>
          <span className="card-rating">★ {rating}</span>
        </div>
        <p className="card-title">{title}</p>
        <p className="card-distance">{distance}</p>
        <p className="card-dates">{dates}</p>
        <p className="card-price">
          <strong>₩{price.toLocaleString()}</strong> /박
        </p>
      </div>
    </article>
  )
}

export default AccommodationCard
