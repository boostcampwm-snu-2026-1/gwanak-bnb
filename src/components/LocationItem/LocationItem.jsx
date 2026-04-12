import styles from './LocationItem.module.css';

function LocationItem({ title, description }) {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#717171"/>
        </svg>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}

export default LocationItem;
