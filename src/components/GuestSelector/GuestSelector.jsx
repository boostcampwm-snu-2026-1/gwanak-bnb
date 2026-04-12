import { useState, useEffect, useRef } from 'react';
import GuestModal from './GuestModal';
import styles from './GuestSelector.module.css';

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
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

  const totalGuests = adults + children;
  const parts = [];
  if (totalGuests > 0) parts.push(`게스트 ${totalGuests}명`);
  if (infants > 0) parts.push(`유아 ${infants}명`);
  if (pets > 0) parts.push(`반려동물 ${pets}마리`);
  const guestLabel = parts.length === 0 ? '게스트 추가' : parts.join(' · ');

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.guestSelector} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>여행자</span>
        <span className={styles.value}>{guestLabel}</span>
      </div>
      {isOpen && (
        <GuestModal
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
          pets={pets}
          setPets={setPets}
        />
      )}
    </div>
  );
}

export default GuestSelector;
