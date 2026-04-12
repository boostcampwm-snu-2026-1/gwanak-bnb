import { useState, useRef, useEffect } from 'react';
import styles from './LocationInput.module.css';

function LocationInput() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.field} onClick={() => setIsOpen(true)}>
        <span className={styles.label}>여행지</span>
        <span className={styles.value}>여행지 검색</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          드롭다운 자리
        </div>
      )}
    </div>
  );
}

export default LocationInput;
