import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationDropdown.module.css';

function LocationDropdown({ locations, activeIndex }) {
  return (
    <div className={styles.dropdown}>
      <span className={styles.heading}>추천 여행지</span>
      {locations.map((location, index) => (
        <LocationItem
          key={location.id}
          title={location.title}
          description={location.description}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}

export default LocationDropdown;
