import { useState } from 'react';
import GuestCounter from '../GuestCounter/GuestCounter';
import overlayStyles from '../../styles/overlay.module.css';

function GuestSelector({ isOpen, onClose }) {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleIncrease = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrease = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] - 1 }));
  };

  if (!isOpen) return null;

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      <div className={overlayStyles.modal} onClick={(e) => e.stopPropagation()}>
        <GuestCounter
          label="성인"
          description="13세 이상"
          count={guests.adults}
          onIncrease={() => handleIncrease('adults')}
          onDecrease={() => handleDecrease('adults')}
        />
        <GuestCounter
          label="어린이"
          description="2~12세"
          count={guests.children}
          onIncrease={() => handleIncrease('children')}
          onDecrease={() => handleDecrease('children')}
        />
        <GuestCounter
          label="유아"
          description="2세 미만"
          count={guests.infants}
          onIncrease={() => handleIncrease('infants')}
          onDecrease={() => handleDecrease('infants')}
        />
        <GuestCounter
          label="반려동물"
          description="보조동물을 동반하시나요?"
          count={guests.pets}
          onIncrease={() => handleIncrease('pets')}
          onDecrease={() => handleDecrease('pets')}
        />
      </div>
    </div>
  );
}

export default GuestSelector;
