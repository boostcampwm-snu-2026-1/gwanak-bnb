import { useState } from 'react'
import './styles/App.css'
import TravelerModal from './components/traveler/TravelerModal'
import SearchBar from './components/layout/SearchBar'

function App() {
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchState, setSearchState] = useState({
    query: '',
    isOpen: false,
    selectedIndex: -1
  });

  const updateSearchState = (updates) => {
    setSearchState(prev => ({ ...prev, ...updates }));
  };

  return (
    <main className="app-container">
      <section id="header">
        <SearchBar 
          adults={adults} 
          children={children} 
          infants={infants}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          
          searchState={searchState}
          updateSearchState={updateSearchState}
        />
      </section>
      
      {isModalOpen && (
        <TravelerModal
          adults={adults} setAdults={setAdults}
          children={children} setChildren={setChildren}
          infants={infants} setInfants={setInfants}
        />
      )}
      
      <div className="content-placeholder">
        <p>인원 선택을 완료하고 멋진 숙소를 찾아보세요</p>
      </div>
    </main>
  );
}

export default App