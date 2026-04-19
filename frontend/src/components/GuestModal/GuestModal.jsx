import GuestCounter from '../GuestCounter/GuestCounter';
import './GuestModal.css';

function GuestModal({ guests, onGuestsChange }) {
  const updateCount = (type, delta) => {
    onGuestsChange((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  return (
    <div className="guest-modal">
      <GuestCounter
        label="성인"
        description="13세 이상"
        count={guests.adult}
        onIncrease={() => updateCount('adult', 1)}
        onDecrease={() => updateCount('adult', -1)}
      />
      <GuestCounter
        label="어린이"
        description="2~12세"
        count={guests.child}
        onIncrease={() => updateCount('child', 1)}
        onDecrease={() => updateCount('child', -1)}
      />
      <GuestCounter
        label="유아"
        description="2세 미만"
        count={guests.infant}
        onIncrease={() => updateCount('infant', 1)}
        onDecrease={() => updateCount('infant', -1)}
      />
      <GuestCounter
        label="반려동물"
        description="보조동물을 동반하시나요?"
        count={guests.pet}
        onIncrease={() => updateCount('pet', 1)}
        onDecrease={() => updateCount('pet', -1)}
      />
    </div>
  );
}

export default GuestModal;
