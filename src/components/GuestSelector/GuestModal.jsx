import GuestCounter from './GuestCounter';
import styles from './GuestModal.module.css';

function GuestModal({ adults, setAdults, children, setChildren, infants, setInfants, pets, setPets }) {
  return (
    <div className={styles.modal}>
      <GuestCounter
        label="성인"
        description="13세 이상"
        count={adults}
        onIncrease={() => setAdults(adults + 1)}
        onDecrease={() => setAdults(adults - 1)}
      />
      <GuestCounter
        label="어린이"
        description="2~12세"
        count={children}
        onIncrease={() => setChildren(children + 1)}
        onDecrease={() => setChildren(children - 1)}
      />
      <GuestCounter
        label="유아"
        description="2세 미만"
        count={infants}
        onIncrease={() => setInfants(infants + 1)}
        onDecrease={() => setInfants(infants - 1)}
      />
      <GuestCounter
        label="반려동물"
        description="보조동물을 동반하시나요?"
        count={pets}
        onIncrease={() => setPets(pets + 1)}
        onDecrease={() => setPets(pets - 1)}
      />
    </div>
  );
}

export default GuestModal;
