import GuestCounter from '../GuestCounter/GuestCounter';
import overlayStyles from '../../styles/overlay.module.css';

function GuestSelector({ isOpen, onClose, guests, onIncrease, onDecrease }) {
  if (!isOpen) return null;

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      <div className={overlayStyles.modal} onClick={(e) => e.stopPropagation()}>
        <GuestCounter
          label="성인"
          description="13세 이상"
          count={guests.adults}
          onIncrease={() => onIncrease('adults')}
          onDecrease={() => onDecrease('adults')}
        />
        <GuestCounter
          label="어린이"
          description="2~12세"
          count={guests.children}
          onIncrease={() => onIncrease('children')}
          onDecrease={() => onDecrease('children')}
        />
        <GuestCounter
          label="유아"
          description="2세 미만"
          count={guests.infants}
          onIncrease={() => onIncrease('infants')}
          onDecrease={() => onDecrease('infants')}
        />
        <GuestCounter
          label="반려동물"
          description="보조동물을 동반하시나요?"
          count={guests.pets}
          onIncrease={() => onIncrease('pets')}
          onDecrease={() => onDecrease('pets')}
        />
      </div>
    </div>
  );
}

export default GuestSelector;
