import { useState } from 'react'

function App() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // count 1 증가
  const increase = () => {
    setGuestCount(guestCount + 1);
  };

  // count 1 감소 (0보다 작아지지는 않음)
  const decrease = () => {
    if (guestCount > 0) {
      setGuestCount(guestCount - 1);
    }
  };

  return (
    <div>
      <header>
        <h1>Airbnb Clone</h1>
      </header>
      
      <main>
        <h2>여행자 선택</h2>
        {/* 성인 */}
        <div>
          <span>성인 (13세 이상)</span>
          <button onClick={() => adults > 0 && setAdults(adults - 1)}>-</button>
          <span>{adults}</span>
          <button onClick={() => setAdults(adults + 1)}>+</button>
        </div>

        {/* 어린이 */}
        <div>
          <span>어린이 (2~12세)</span>
          <button onClick={() => children > 0 && setChildren(children - 1)}>-</button>
          <span>{children}</span>
          <button onClick={() => setChildren(children + 1)}>+</button>
        </div>

        {/* 유아 */}
        <div>
          <span>유아 (2세 미만)</span>
          <button onClick={() => infants > 0 && setInfants(infants - 1)}>-</button>
          <span>{infants}</span>
          <button onClick={() => setInfants(infants + 1)}>+</button>
        </div>

        {/* 반려동물 */}
        <div>
          <span>반려동물</span>
          <button onClick={() => pets > 0 && setPets(pets - 1)}>-</button>
          <span>{pets}</span>
          <button onClick={() => setPets(pets + 1)}>+</button>
        </div>

        <hr />
        <div>
          <strong>게스트 {adults + children}명, 유아 {infants}명</strong>
          {pets > 0 && <strong> (반려동물 {pets}마리)</strong>}
        </div>

      </main>
    </div>
  )
}

export default App