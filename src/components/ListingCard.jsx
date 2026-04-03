import './ListingCard.css';

export default function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <div className="listing-image">
        <img src={listing.image} alt={listing.title} />
        <button className="heart-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
      <div className="listing-info">
        <div className="listing-header">
          <h3>{listing.title}</h3>
          <span className="rating">★ {listing.rating}</span>
        </div>
        <p className="listing-distance">{listing.distance}</p>
        <p className="listing-date">{listing.date}</p>
        <p className="listing-price"><strong>₩{listing.price.toLocaleString()}</strong> /박</p>
      </div>
    </div>
  );
}
