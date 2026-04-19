import HeartIcon from '../../assets/icons/HeartIcon';
import styles from './SearchResults.module.css';

function SearchResults({ results }) {
  if (results === null) return null;

  if (results.length === 0) {
    return <p className={styles.empty}>검색 결과가 없습니다.</p>;
  }

  return (
    <div className={styles.grid}>
      {results.map((item) => (
        <div key={item._id} className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={item.images[0]}
              alt={item.title}
            />
            <HeartIcon />
          </div>
          <div className={styles.info}>
            <div className={styles.topRow}>
              <span className={styles.location}>
                {item.location.city}, {item.location.province}
              </span>
              <span className={styles.rating}>★ {item.rating}</span>
            </div>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.price}>
              <strong>₩{item.price.toLocaleString()}</strong> / 박
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
