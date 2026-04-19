import styles from "./DateRangeField.module.css";

function DateRangeField({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <span className={styles.label}>여행 기간</span>

        <div className={styles.inputRow}>
          <input
            type="date"
            value={checkIn}
            className={styles.input}
            aria-label="체크인 날짜"
            onChange={(event) => onCheckInChange(event.target.value)}
          />
          <span className={styles.rangeDivider}>-</span>
          <input
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            className={styles.input}
            aria-label="체크아웃 날짜"
            onChange={(event) => onCheckOutChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default DateRangeField;
