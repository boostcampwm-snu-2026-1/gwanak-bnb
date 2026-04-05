import { useState, useEffect, useRef } from 'react';
import GuestModal from './GuestModal';
import styles from './GuestSelector.module.css';

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.guestSelector} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>여행자</span>
        <span className={styles.value}>게스트 추가</span>
      </div>
      {isOpen && <GuestModal />}
    </div>
  );
}

export default GuestSelector;
