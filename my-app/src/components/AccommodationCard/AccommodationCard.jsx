import styles from './AccommodationCard.module.css';

function AccommodationCard({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {item.images?.main ? (
          <img src={item.images.main} alt={item.title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>이미지 없음</div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.topRow}>
          <span className={styles.location}>
            {item.address?.city} {item.address?.district}
          </span>
          {item.rating?.overall > 0 && (
            <span className={styles.rating}>
              ★ {item.rating.overall.toFixed(2)}
            </span>
          )}
        </div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.price}>
          ₩{item.price?.toLocaleString()} <span className={styles.priceUnit}>/박</span>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
