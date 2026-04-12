import { useState, useRef, useEffect } from 'react';
import LocationDropdown from '../LocationDropdown/LocationDropdown';
import styles from './LocationInput.module.css';

function LocationInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/locations')
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = inputValue
    ? locations.filter((loc) => loc.title.includes(inputValue))
    : locations;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.field} onClick={() => setIsOpen(true)}>
        <span className={styles.label}>여행지</span>
        <input
          className={styles.input}
          type="text"
          placeholder="여행지 검색"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      {isOpen && <LocationDropdown locations={filteredLocations} />}
    </div>
  );
}

export default LocationInput;
