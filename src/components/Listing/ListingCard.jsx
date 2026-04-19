import styles from './ListingCard.module.css'

function ListingCard({ listing }) {
  const badgeText = listing.isSuperhost ? '슈퍼호스트' : listing.isGuestFavorite ? '게스트 선호' : ''
  const metaLines = [
    listing.subtitle || null,
    listing.roomLabel || listing.date || null,
    listing.date && listing.roomLabel ? listing.date : null,
    listing.ratingLabel || listing.price || null,
    listing.priceLabel || null,
  ].filter(Boolean)

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={listing.image} alt={listing.title} className={styles.image} />
        {badgeText && <span className={styles.badge}>{badgeText}</span>}
        <button className={styles.wishButton} type="button" aria-label={`${listing.title} 찜`}>
          ♡
        </button>
      </div>

      <strong className={styles.title}>{listing.title}</strong>
      {metaLines.map((line) => (
        <p className={styles.meta} key={line}>
          {line}
        </p>
      ))}
    </article>
  )
}

export default ListingCard
