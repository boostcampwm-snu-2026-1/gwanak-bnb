import GuestCounter from './GuestCounter';
import styles from './GuestModal.module.css';

function GuestModal({ guests, setGuests }) {
  function handleChange(key, delta) {
    setGuests({ ...guests, [key]: guests[key] + delta });
  }

  return (
    <div className={styles.modal}>
      <GuestCounter
        label="성인"
        description="13세 이상"
        count={guests.adults}
        onIncrease={() => handleChange('adults', 1)}
        onDecrease={() => handleChange('adults', -1)}
      />
      <GuestCounter
        label="어린이"
        description="2~12세"
        count={guests.children}
        onIncrease={() => handleChange('children', 1)}
        onDecrease={() => handleChange('children', -1)}
      />
      <GuestCounter
        label="유아"
        description="2세 미만"
        count={guests.infants}
        onIncrease={() => handleChange('infants', 1)}
        onDecrease={() => handleChange('infants', -1)}
      />
      <GuestCounter
        label="반려동물"
        description="보조동물을 동반하시나요?"
        count={guests.pets}
        onIncrease={() => handleChange('pets', 1)}
        onDecrease={() => handleChange('pets', -1)}
      />
    </div>
  );
}

export default GuestModal;
