import { useState } from 'react'
import CounterRow from './CounterRow'
import './TravelerPopup.css'

function TravelerPopup() {
  const [adultCount, setAdultCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)
  const [petCount, setPetCount] = useState(0)

  return (
    <div className="typeOfTraveler" onClick={(e) => e.stopPropagation()}>
      
      <CounterRow 
        title="성인" 
        desc="13세 이상" 
        count={adultCount} 
        onIncrease={() => adultCount < 100 ? setAdultCount(c => c + 1) : null}
        onDecrease={() => adultCount > 0 ? setAdultCount(c => c - 1) : null}
      />
      
      <CounterRow 
        title="어린이" 
        desc="2~12세" 
        count={childCount} 
        onIncrease={() => childCount < 100 ? setChildCount(c => c + 1) : null}
        onDecrease={() => childCount > 0 ? setChildCount(c => c - 1) : null}
      />

      <CounterRow 
        title="유아" 
        desc="2세 미만" 
        count={infantCount} 
        onIncrease={() => infantCount < 100 ? setInfantCount(c => c + 1) : null}
        onDecrease={() => infantCount > 0 ? setInfantCount(c => c - 1) : null}
      />

      <CounterRow 
        title="반려동물" 
        desc="보조동물을 동반하시나요?" 
        count={petCount} 
        onIncrease={() => petCount < 100 ? setPetCount(c => c + 1) : null}
        onDecrease={() => petCount > 0 ? setPetCount(c => c - 1) : null}
      />
    </div>
  )
}

export default TravelerPopup;