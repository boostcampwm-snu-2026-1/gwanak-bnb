import styles from "./DestinationItem.module.css";

function DestinationItem({ destination, isHighlighted, onClick }) {
  return (
    <li
      className={`${styles.item} ${isHighlighted ? styles.highlighted : ""}`}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className={styles.iconBox}>📍</div>
      <div className={styles.text}>
        <div className={styles.name}>{destination.name}</div>
        <div className={styles.description}>{destination.description}</div>
      </div>
    </li>
  );
}

export default DestinationItem;
