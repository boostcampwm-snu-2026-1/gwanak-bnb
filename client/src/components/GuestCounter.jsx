import styles from "./GuestCounter.module.css";

function GuestCounter({ label, description, count, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.labels}>
        <span className={styles.label}>{label}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={() => onChange(count - 1)}
          disabled={count <= 0}
        >
          -
        </button>
        <span className={styles.count}>{count}</span>
        <button className={styles.button} onClick={() => onChange(count + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

export default GuestCounter;
