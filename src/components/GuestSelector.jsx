import styles from "./GuestSelector.module.css";

function GuestSelector({ guests, guestConfig, onDecrement, onIncrement }) {
  return (
    <section className={styles.panel}>
      {Object.entries(guestConfig).map(([type, config], index, entries) => (
        <div key={type} className={styles.row}>
          <div>
            <strong className={styles.label}>{config.title}</strong>
            <p className={styles.description}>{config.description}</p>
          </div>

          <div className={styles.counter}>
            <button
              type="button"
              className={styles.counterButton}
              onClick={() => onDecrement(type)}
              disabled={guests[type] === 0}
              aria-label={`${config.title} 감소`}
            >
              -
            </button>
            <span className={styles.count}>{guests[type]}</span>
            <button
              type="button"
              className={styles.counterButton}
              onClick={() => onIncrement(type)}
              disabled={guests[type] === config.max}
              aria-label={`${config.title} 증가`}
            >
              +
            </button>
          </div>

          {index < entries.length - 1 ? <div className={styles.divider} /> : null}
        </div>
      ))}

      <p className={styles.notice}>
        숙소마다 허용 인원과 반려동물 가능 여부가 다를 수 있습니다.
      </p>
    </section>
  );
}

export default GuestSelector;

