import styles from './DestinationCard.module.css';

function DestinationCard({ name, region, icon, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.region}>{region}</span>
      </div>
    </button>
  );
}

export default DestinationCard;
