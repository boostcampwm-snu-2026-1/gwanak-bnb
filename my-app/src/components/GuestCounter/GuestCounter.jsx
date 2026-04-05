import styles from './GuestCounter.module.css';

function GuestCounter({ label, description, count, onIncrease, onDecrease, min = 0 }) {
  return (
    <div className={styles.counter}>
      <div className={styles.info}>
        <span className={styles.label}>{label}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={onDecrease}
          disabled={count <= min}
        >
          -
        </button>
        <span className={styles.count}>{count}</span>
        <button
          className={styles.button}
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default GuestCounter;