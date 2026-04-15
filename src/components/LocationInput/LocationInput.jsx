import { useState, useRef, useEffect } from 'react';
import LocationDropdown from '../LocationDropdown/LocationDropdown';
import styles from './LocationInput.module.css';

function LocationInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/accommodations/locations')
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

  const filteredLocations = searchQuery
    ? locations.filter((loc) => loc.title.includes(searchQuery))
    : locations;

  function handleKeyDown(e) {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      const nextIndex = (activeIndex + 1) % filteredLocations.length;
      setActiveIndex(nextIndex);
      setInputValue(filteredLocations[nextIndex].title);
    }

    if (e.key === 'ArrowUp') {
      const prevIndex = (activeIndex - 1 + filteredLocations.length) % filteredLocations.length;
      setActiveIndex(prevIndex);
      setInputValue(filteredLocations[prevIndex].title);
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.field} onClick={() => setIsOpen(true)}>
        <span className={styles.label}>여행지</span>
        <input
          className={styles.input}
          type="text"
          placeholder="여행지 검색"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSearchQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isOpen && (
        <LocationDropdown
          locations={filteredLocations}
          activeIndex={activeIndex}
          onSelect={(title) => {
            setInputValue(title);
            setSearchQuery('');
            setActiveIndex(-1);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default LocationInput;
