import type { ListingSummary } from '../../api/listings'
import './ListingCard.css'

export type ListingCardProps = {
  listing: ListingSummary
}

export function ListingCard({ listing }: ListingCardProps) {
  const price = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(listing.pricePerNight)

  return (
    <article className="listing-card">
      <div className="listing-card-image-wrap">
        <img
          className="listing-card-image"
          src={listing.thumbnailUrl}
          alt=""
          loading="lazy"
          width={320}
          height={240}
        />
      </div>
      <div className="listing-card-body">
        <h3 className="listing-card-title">{listing.title}</h3>
        <p className="listing-card-meta">
          최대 {listing.maxGuests}명 · 평점 {listing.rating.toFixed(1)} (
          {listing.reviewCount})
        </p>
        {listing.description ? (
          <p className="listing-card-desc">{listing.description}</p>
        ) : null}
        <p className="listing-card-price">
          <span className="listing-card-price-value">{price}</span>
          <span className="listing-card-price-unit"> / 박</span>
        </p>
      </div>
    </article>
  )
}
