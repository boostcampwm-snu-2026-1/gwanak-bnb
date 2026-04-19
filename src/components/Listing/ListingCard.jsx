import styles from './ListingCard.module.css'

function ListingCard({ listing }) {
  const badgeText = listing.isSuperhost ? '슈퍼호스트' : listing.isGuestFavorite ? '게스트 선호' : ''

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={listing.image} alt={listing.title} className={styles.image} />
        {badgeText && <span className={styles.badge}>{badgeText}</span>}
        <button className={styles.wishButton} type="button" aria-label={`${listing.title} 찜`}>
          ♡
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <strong className={styles.title}>{listing.title}</strong>
          {listing.ratingLabel && <span className={styles.rating}>{listing.ratingLabel}</span>}
        </div>
        {listing.subtitle && <p className={styles.meta}>{listing.subtitle}</p>}
        {listing.roomLabel && <p className={styles.meta}>{listing.roomLabel}</p>}
        {listing.date && <p className={styles.meta}>{listing.date}</p>}
        {listing.priceLabel && <p className={styles.price}>{listing.priceLabel}</p>}
      </div>
    </article>
  )
}

export default ListingCard
