import { useState, useEffect, useRef } from 'react';
import GuestModal from './GuestModal';
import styles from './GuestSelector.module.css';

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
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

  const totalGuests = guests.adults + guests.children;
  const parts = [];
  if (totalGuests > 0) parts.push(`게스트 ${totalGuests}명`);
  if (guests.infants > 0) parts.push(`유아 ${guests.infants}명`);
  if (guests.pets > 0) parts.push(`반려동물 ${guests.pets}마리`);
  const guestLabel = parts.length === 0 ? '게스트 추가' : parts.join(' · ');

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.guestSelector} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>여행자</span>
        <span className={styles.value}>{guestLabel}</span>
      </div>
      {isOpen && (
        <GuestModal guests={guests} setGuests={setGuests} />
      )}
    </div>
  );
}

export default GuestSelector;
