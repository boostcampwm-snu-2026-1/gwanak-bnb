import styles from './ListingCard.module.css'

function ListingCard({ listing }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={listing.image} alt={listing.title} className={styles.image} />
        <span className={styles.badge}>게스트 선호</span>
        <button className={styles.wishButton} type="button" aria-label={`${listing.title} 찜`}>
          ♡
        </button>
      </div>

      <strong className={styles.title}>{listing.title}</strong>
      <p className={styles.meta}>{listing.date}</p>
      <p className={styles.meta}>{listing.price}</p>
    </article>
  )
}

export default ListingCard
