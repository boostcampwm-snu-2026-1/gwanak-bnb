import { useState, useEffect } from 'react'
import './styles/App.css'
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

  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateSearchState = (updates) => {setSearchState(prev => ({ ...prev, ...updates }));};

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const totalGuests = adults + children;
      const region = searchState.query || '전체';
      const response = await fetch(`http://localhost:8080/api/accommodations?region=${region}&guests=${totalGuests}`);
      
      if (!response.ok) throw new Error('서버 응답에 문제가 있습니다.');

      const data = await response.json();
      setAccommodations(data);
      
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchState.query, adults, children]);

  return (
    <main className="app-container">
      <section id="header">
        <SearchBar 
          adults={adults} 
          children={children} 
          infants={infants}
          setAdults={setAdults}
          setChildren={setChildren}
          setInfants={setInfants}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchState={searchState}
          updateSearchState={updateSearchState}
          onSearch={handleSearch} 
        />
      </section>
      <div className="content-placeholder">
        {error && (
          <div style={{ 
            padding: '15px', 
            marginBottom: '20px', 
            backgroundColor: '#ffe0e0', 
            border: '1px solid #ff6b6b', 
            borderRadius: '8px',
            color: '#d63031'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>🔍 숙소를 검색 중입니다...</p>
          </div>
        )}
        
        {!isLoading && accommodations.length > 0 ? (
          <div className="search-results">
            <h2>검색 결과: {accommodations.length}개의 숙소</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
              {accommodations.map((room) => (
                <div 
                  key={room._id} 
                  className="accommodation-card"
                  style={{ 
                    border: '1px solid #eee', 
                    borderRadius: '12px',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}>
                  
                  {/* 이미지 영역 */}
                  <div className="card-image-wrapper">
                    {room.images && room.images.length > 0 ? (
                      <img 
                        src={room.images[0]} 
                        alt={room.title}
                        className="card-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8', color: '#999' }}>
                        이미지 없음
                      </div>
                    )}
                    <div style={{ width: '100%', height: '100%', display: 'none', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8e8e8', color: '#999' }}>
                      이미지 로딩 실패
                    </div>
                  </div>
                  
                  {/* 텍스트 영역 */}
                  <div className="card-content">
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{room.title}</h3>
                      <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>{room.description}</p>
                      <p style={{ margin: '2px 0 2px 0', fontSize: '11px', color: '#999' }}>{room.region} | 최대 {room.capacity.maxGuests}명</p>
                    </div>
                    <p style={{ fontWeight: 'bold', color: '#ff385c', margin: '0', fontSize: '14px' }}>
                      ₩{room.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !isLoading && <p>인원 선택을 완료하고 멋진 숙소를 찾아보세요</p>
        )}
      </div>
    </main>
  );
}

export default App