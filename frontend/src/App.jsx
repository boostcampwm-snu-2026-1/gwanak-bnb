import { useState } from 'react'
import './styles/App.css'

function App() {
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(0)
  return (
    <main className = "app-container">
      <section id = "header">
        <div className = "search-bar-placeholder">
          <h1>Gwanak-bnb Search Bar</h1>
          <p>성인: {adults}, 어린이: {children}, 유아: {infants}</p>
          <button onClick={() => setIsModalOpen(!isModalOpen)}>
            {isModalOpen ? '모달 닫기' : '여행자 선택하기'}
          </button>
        </div>
      </section>
      {isModalOpen && (
        <div style={{ padding: '20px', background: '#fff', marginTop: '10px', borderRadius: '10px' }}>
          인원 선택 모달
        </div>
      )}
    </main>
  );
}

export default App