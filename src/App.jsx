import { useState } from 'react'

function App() {
  const [guestCount, setGuestCount] = useState(0);

  return (
    <div>
      <header>
        <h1>Airbnb Clone</h1>
      </header>
      
      <main>
        <p>'여행자' 선택 기능 개발 예정</p>
        <div>
          <span>현재 게스트: {guestCount}명</span>
        </div>
      </main>
    </div>
  )
}

export default App