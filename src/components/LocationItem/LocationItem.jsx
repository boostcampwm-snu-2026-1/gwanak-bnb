import LocationPinIcon from '../../assets/icons/LocationPinIcon';
import styles from './LocationItem.module.css';

function LocationItem({ title, description }) {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <LocationPinIcon />
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}

export default LocationItem;
