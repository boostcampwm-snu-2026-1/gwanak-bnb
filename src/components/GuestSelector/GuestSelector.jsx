import { useState } from 'react';
import GuestModal from './GuestModal';
import styles from './GuestSelector.module.css';

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.guestSelector} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>여행자</span>
        <span className={styles.value}>게스트 추가</span>
      </div>
      {isOpen && <GuestModal />}
    </div>
  );
}

export default GuestSelector;
