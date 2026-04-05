import ListingCard from './ListingCard'
import styles from './ListingSection.module.css'

function ListingSection({ title, listings }) {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>{title}</h2>
        <button type="button" className={styles.arrowButton} aria-label={`${title} 더 보기`}>
          →
        </button>
      </div>

      <div className={styles.grid}>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}

export default ListingSection
