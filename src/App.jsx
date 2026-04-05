import { useState } from 'react'
import GuestRow from './components/GuestRow'

function App() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const totalGuests = adults + children; // 성인 + 어린이 합계
  const isMaxGuestsReached = totalGuests >= 16;
  const needsAdult = children > 0 || infants > 0 || pets > 0;

  const handleIncreaseAdult = () => {
    if (totalGuests < 16) {
      setAdults(prev => prev + 1);
    }
  };

  const handleDecreaseAdult = () => {
    // 다른 게스트가 있는데 성인을 0으로 만들려고 하면 차단
    if (needsAdult && adults <= 1) return;
    if (adults > 0) setAdults(prev => prev - 1);
  };

  const handleIncreaseChildren = () => {
    if (isMaxGuestsReached) return;

    // 성인이 0명인데 어린이를 추가하면 성인도 자동으로 1명 추가
    if (adults === 0) {
        setAdults(1);
        setChildren(prev => prev + 1);
    } else{
      setChildren(prev => prev + 1);
    }
  };

  const handleIncreaseInfants = () => {
    if (infants >= 5) return; // 유아 최대 5명 제한

    if (adults === 0) {
      setAdults(1);
    }
    setInfants(prev => prev + 1);
  };

  const handleIncreasePets = () => {
    if (pets >= 5) return; // 반려동물 최대 5마리 제한

    if (adults === 0) {
      setAdults(1);
    }
    setPets(prev => prev + 1);
  };

return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h2>여행자 선택</h2>
      </header>

      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' , marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold' }}>
          {`게스트 ${totalGuests}명`}
          {isMaxGuestsReached && "+"}
        </div>
        {infants > 0 && <div style={{ fontSize: '0.9rem' }}>유아 {infants}명</div>}
        {pets > 0 && <div style={{ fontSize: '0.9rem' }}>반려동물 {pets}마리</div>}
      </div>

      <GuestRow 
        title="성인" description="13세 이상" 
        count={adults} onIncrease={handleIncreaseAdult} onDecrease={handleDecreaseAdult} 
      />
      
      <GuestRow 
        title="어린이" description="2~12세" 
        count={children} onIncrease={handleIncreaseChildren} onDecrease={() => children > 0 && setChildren(prev => prev - 1)} 
      />

      <GuestRow 
        title="유아" description="2세 미만" 
        count={infants} onIncrease={handleIncreaseInfants} onDecrease={() => infants > 0 && setInfants(prev => prev - 1)} 
      />

      <GuestRow 
        title="반려동물" description="보조동물을 동반하시나요?" 
        count={pets} onIncrease={handleIncreasePets} onDecrease={() => pets > 0 && setPets(prev => prev - 1)} 
      />
    </div>
  );
}

export default App