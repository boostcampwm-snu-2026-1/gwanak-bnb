import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationDropdown.module.css';

function LocationDropdown({ locations }) {
  return (
    <div className={styles.dropdown}>
      <span className={styles.heading}>추천 여행지</span>
      {locations.map((location) => (
        <LocationItem
          key={location.id}
          title={location.title}
          description={location.description}
        />
      ))}
    </div>
  );
}

export default LocationDropdown;
