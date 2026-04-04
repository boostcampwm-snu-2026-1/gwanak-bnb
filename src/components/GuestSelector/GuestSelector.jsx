import styles from './GuestSelector.module.css';

function GuestSelector() {
  return (
    <div className={styles.guestSelector}>
      <span className={styles.label}>여행자</span>
      <span className={styles.value}>게스트 추가</span>
    </div>
  );
}

export default GuestSelector;
