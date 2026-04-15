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
          <img
            className={styles.image}
            src={item.images[0]}
            alt={item.title}
          />
          <div className={styles.info}>
            <span className={styles.location}>
              {item.location.city}, {item.location.province}
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.bottom}>
              <span className={styles.price}>₩{item.price.toLocaleString()} / 박</span>
              <span className={styles.rating}>★ {item.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
