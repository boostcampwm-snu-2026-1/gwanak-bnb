import LocationItem from '../LocationItem/LocationItem';
import styles from './LocationDropdown.module.css';

function LocationDropdown({ locations, activeIndex, onSelect }) {
  return (
    <div className={styles.dropdown}>
      <span className={styles.heading}>추천 여행지</span>
      {locations.map((location, index) => (
        <LocationItem
          key={location.id}
          title={location.title}
          description={location.description}
          isActive={index === activeIndex}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default LocationDropdown;
