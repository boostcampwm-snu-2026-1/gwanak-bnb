import styles from './ListingCard.module.css';

export default function ListingCard({ listing }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={listing.image} alt={listing.title} />
        <button className={styles.heartBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h3>{listing.title}</h3>
          <span className={styles.rating}>★ {listing.rating}</span>
        </div>
        <p className={styles.distance}>{listing.distance}</p>
        <p className={styles.date}>{listing.date}</p>
        <p className={styles.price}><strong>₩{listing.price.toLocaleString()}</strong> /박</p>
      </div>
    </div>
  );
}
