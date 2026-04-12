import { useState, useReducer } from 'react';
import GuestRow from './GuestRow';
import { guestReducer, INITIAL_GUESTS, GUEST_LIMITS } from './GuestReducer';

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false); // 처음에는 닫혀있음(false)
  const [guests, dispatch] = useReducer(guestReducer, INITIAL_GUESTS);
  const { adults, children, infants, pets } = guests;
  
  const totalGuests = adults + children; // 성인 + 어린이 합계
  const isDefault = totalGuests <= 0 && infants <= 0 && pets <= 0;

  const guestSummary = isDefault 
    ? "게스트 추가" 
    : `게스트 ${totalGuests}명${infants > 0 ? `, 유아 ${infants}명` : ""}${pets > 0 ? `, 반려동물 ${pets}마리` : ""}`;

  const handleReset = (e) => {
    // 부모 요소로 클릭 이벤트가 퍼지는 것을 방지
    e.stopPropagation(); 
    
    dispatch({ type: 'RESET' });
  };

return (
    <div className="relative w-full max-w-sm">
      {/* 트리거 버튼 */}
      <div 
        onClick={() => setIsOpen(prev => !prev)} // 함수형 업데이트(prev는 이전 호출 결과를 정확히 받음) - 이전 상태를 기반으로 할 때
        className={`group relative flex flex-col gap-1 border border-gray-300 rounded-3xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm ${isOpen ? 'bg-white shadow-md border-transparent' : ''}`}
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
        <div className="absolute top-full mt-3 w-[400px] bg-white border border-gray-200 rounded-3xl p-4 shadow-xl z-50">
          <GuestRow 
            title="성인" 
            description="13세 이상" 
            count={adults} 
            onIncrease={() => dispatch({ type: 'adults', delta: 1 })}
            onDecrease={() => dispatch({ type: 'adults', delta: -1 })}
            isMin={adults === 0 || ((children > 0 || infants > 0 || pets > 0) && adults <= 1)} 
            isMax={totalGuests >= GUEST_LIMITS.guests.max}
          />

          <GuestRow 
            title="어린이" 
            description="2~12세" 
            count={children} 
            onIncrease={() => dispatch({ type: 'children', delta: 1 })}
            onDecrease={() => dispatch({ type: 'children', delta: -1 })}
            isMin={children === 0} 
            isMax={totalGuests >= GUEST_LIMITS.guests.max}
          />

          <GuestRow 
            title="유아" 
            description="2세 미만" 
            count={infants} 
            onIncrease={() => dispatch({ type: 'infants', delta: 1 })}
            onDecrease={() => dispatch({ type: 'infants', delta: -1 })}
            isMin={infants === 0} 
            isMax={infants >= GUEST_LIMITS.infants.max}
          />

          <GuestRow 
            title="반려동물" 
            description="보조동물 동반" 
            count={pets} 
            onIncrease={() => dispatch({ type: 'pets', delta: 1 })}
            onDecrease={() => dispatch({ type: 'pets', delta: -1 })}
            isMin={pets === 0} 
            isMax={pets >= GUEST_LIMITS.pets.max}
          />

        </div>
      )}
    </div>
  );
}

export default GuestSelector;