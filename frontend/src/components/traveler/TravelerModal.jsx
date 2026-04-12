import Counter from './Counter';
import '../styles/Modal.css';

function TravelerModal({ 
  adults, setAdults, 
  children, setChildren, 
  infants, setInfants 
}) {
  return (
    <div className="traveler-modal">
      <Counter 
        label="성인" 
        sublabel="13세 이상" 
        count={adults} 
        onIncrease={() => setAdults(adults + 1)} 
        onDecrease={() => setAdults(adults - 1)} 
        min={0}
        max={10}
      />
      <Counter 
        label="어린이" 
        sublabel="2~12세" 
        count={children} 
        onIncrease={() => setChildren(children + 1)} 
        onDecrease={() => setChildren(children - 1)} 
        min={0}
        max={10}
      />
      <Counter 
        label="유아" 
        sublabel="2세 미만" 
        count={infants} 
        onIncrease={() => setInfants(infants + 1)} 
        onDecrease={() => setInfants(infants - 1)} 
        min={0}
        max={10}
      />
    </div>
  );
}

export default TravelerModal;