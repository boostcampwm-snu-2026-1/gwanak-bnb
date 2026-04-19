import { useState } from 'react'
import CounterRow from './CounterRow'
import './TravelerPopup.css'

function TravelerPopup({ counts, setCounts }) {

  return (
    <div className="typeOfTraveler" onClick={(e) => e.stopPropagation()}>
      
      <CounterRow 
        title="성인" 
        desc="13세 이상" 
        count={counts.adult} 
        onIncrease={() => counts.adult < 100 ? setCounts(prev => ({ ...prev, adult: prev.adult + 1 })) : null}
        onDecrease={() => counts.adult > 0 ? setCounts(prev => ({ ...prev, adult: prev.adult - 1 })) : null}
      />
      
      <CounterRow 
        title="어린이" 
        desc="2~12세" 
        count={counts.child} 
        onIncrease={() => counts.child < 100 ? setCounts(prev => ({ ...prev, child: prev.child + 1 })) : null}
        onDecrease={() => counts.child > 0 ? setCounts(prev => ({ ...prev, child: prev.child - 1 })) : null}
      />

      <CounterRow 
        title="유아" 
        desc="2세 미만" 
        count={counts.infant} 
        onIncrease={() => counts.infant < 100 ? setCounts(prev => ({ ...prev, infant: prev.infant + 1 })) : null}
        onDecrease={() => counts.infant > 0 ? setCounts(prev => ({ ...prev, infant: prev.infant - 1 })) : null}
      />

      <CounterRow 
        title="반려동물" 
        desc="보조동물을 동반하시나요?" 
        count={counts.pet} 
        onIncrease={() => counts.pet < 100 ? setCounts(prev => ({ ...prev, pet: prev.pet + 1 })) : null}
        onDecrease={() => counts.pet > 0 ? setCounts(prev => ({ ...prev, pet: prev.pet - 1 })) : null}
      />
    </div>
  )
}

export default TravelerPopup;