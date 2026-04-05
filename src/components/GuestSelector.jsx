import { useState } from 'react';
import GuestRow from './GuestRow';

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false); // 처음에는 닫혀있음(false)
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  
  const totalGuests = adults + children; // 성인 + 어린이 합계
  const isMaxGuestsReached = totalGuests >= 16;
  const needsAdult = children > 0 || infants > 0 || pets > 0;
  const isDefault = totalGuests <= 0 && infants <= 0 && pets <= 0;

  const guestSummary = isDefault 
    ? "게스트 추가" 
    : `게스트 ${totalGuests}명${infants > 0 ? `, 유아 ${infants}명` : ""}${pets > 0 ? `, 반려동물 ${pets}마리` : ""}`;

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
    <div className="relative w-full max-w-sm">
      {/* 트리거 버튼 */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative border border-gray-300 rounded-3xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
      >
        <div className="text-xs font-bold uppercase tracking-wider">여행자</div>
        <div className={isDefault ? "text-gray-500" : "font-semibold"}>
          {guestSummary}
        </div>

        {!isDefault && (
          <button 
            onClick={handleReset}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 z-10"
          >
            ×
          </button>
        )}
      </div>
      
      {/* 모달 창 */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-[400px] bg-white border border-gray-200 rounded-3xl p-8 shadow-xl z-50 animate-in fade-in zoom-in duration-200">
          
          <GuestRow 
            title="성인" 
            description="13세 이상" 
            count={adults} 
            onIncrease={handleIncreaseAdult} 
            onDecrease={handleDecreaseAdult} 
            isMin={adults === 0 || ((children > 0 || infants > 0 || pets > 0) && adults <= 1)} 
            isMax={isMaxGuestsReached} 
          />

          <GuestRow 
            title="어린이" 
            description="2~12세" 
            count={children} 
            onIncrease={handleIncreaseChildren} 
            onDecrease={() => children > 0 && setChildren(p => p - 1)} 
            isMin={children === 0} 
            isMax={isMaxGuestsReached} 
          />

          <GuestRow 
            title="유아" 
            description="2세 미만" 
            count={infants} 
            onIncrease={() => {
              if (infants < 5) {
                if (adults === 0) setAdults(1);
                setInfants(p => p + 1);
              }
            }} 
            onDecrease={() => infants > 0 && setInfants(p => p - 1)} 
            isMin={infants === 0} 
            isMax={infants >= 5} 
          />

          <GuestRow 
            title="반려동물" 
            description="보조동물 동반" 
            count={pets} 
            onIncrease={() => {
              if (pets < 5) {
                if (adults === 0) setAdults(1);
                setPets(p => p + 1);
              }
            }} 
            onDecrease={() => pets > 0 && setPets(p => p - 1)} 
            isMin={pets === 0} 
            isMax={pets >= 5} 
          />

        </div>
      )}
    </div>
  );
}

export default GuestSelector;