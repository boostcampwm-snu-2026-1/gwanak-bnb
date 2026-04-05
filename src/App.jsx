import { useState } from 'react'
import GuestRow from './components/GuestRow'

function App() {
  const [isOpen, setIsOpen] = useState(false); // 처음에는 닫혀있음(false)
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  
  const totalGuests = adults + children; // 성인 + 어린이 합계
  const isMaxGuestsReached = totalGuests >= 16;
  const needsAdult = children > 0 || infants > 0 || pets > 0;
  const isDefault = totalGuests <= 0 && infants <= 0 && pets <= 0;

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

  const handleReset = (e) => {
    // 부모 요소로 클릭 이벤트가 퍼지는 것을 방지
    e.stopPropagation(); 
    
    setAdults(0);
    setChildren(0);
    setInfants(0);
    setPets(0);
  };

return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '10px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <header>
        <h1><strong>관악BNB</strong></h1>
      </header>

      <div 
        onClick={() => setIsOpen(!isOpen)} // 클릭할 때마다 반대로 (true <-> false)
        style={{
          border: '1px solid #ddd',
          borderRadius: '30px',
          padding: '10px 24px',
          cursor: 'pointer',
          display: 'inline-block',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          position: 'relative',
          width: '100%',
          marginTop: '10px'
        }}
      >
        <div>여행자</div>
        <div>
          {isDefault ? (
            <div style={{ color: '#717171' }}>게스트 추가</div>
          ) : (
            <div style={{ fontWeight: 'bold' }}>
                {`게스트 ${totalGuests}명`}
                {isMaxGuestsReached && "+"}
                {infants > 0 && `, 유아 ${infants}명`}
                {pets > 0 && `, 반려동물 ${pets}마리`}
            </div>
          )}
        </div>
        
        {/* x 버튼 */}
        {!isDefault && (
          <button
            onClick={handleReset}
            style={{
              position: 'absolute', // 트리거 버튼 위에 띄우기 위해
              right: '25px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f7f7f7',
              border: '1px solid #ddd',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10 // 모달보다 앞에 보이게
            }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div style={{
          marginTop: '15px',
          width: '400px',
          padding: '25px',
          border: '1px solid #ddd',
          borderRadius: '20px',
          backgroundColor: 'white',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          position: 'absolute' // 다른 요소 위에 뜨게 설정
        }}>
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
      )}
    </div>
  );
}

export default App