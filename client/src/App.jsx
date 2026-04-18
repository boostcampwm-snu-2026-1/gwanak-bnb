// client/src/App.jsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  // 백엔드에서 받아온 검색 결과를 저장할 장부(상태)
  const [searchResults, setSearchResults] = useState([]);

  // 검색 버튼을 누르면 실행될 함수
  const handleSearch = async (keyword, totalGuests) => {
    try {
      console.log(`검색 요청: 여행지=${keyword}, 인원=${totalGuests}`);
      
      // 1. 백엔드 API로 fetch 요청 보내기
      const response = await fetch(`http://localhost:8080/api/accommodations?location=${keyword}&guests=${totalGuests}`);
      
      // 2. 응답받은 JSON 데이터 꺼내기
      const data = await response.json();
      
      // 3. 상태(State)에 저장하여 화면 업데이트 유도하기
      setSearchResults(data);
      console.log("찾은 숙소들:", data);

    } catch (error) {
      console.error("데이터를 가져오는 중 에러 발생:", error);
    }
  };

  return (
    // 기존 가로 정렬에서 세로로 쌓이도록 스타일 살짝 수정
    <div className="app-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
      
      {/* SearchBar에 검색 실행 리모컨(onSearch)을 전달 */}
      <SearchBar onSearch={handleSearch} />

      {/* 🌟 임시 검색 결과 화면 표시 영역 */}
      <div style={{ marginTop: '3rem', width: '100%', maxWidth: '800px' }}>
        {searchResults.length > 0 ? (
          <div>
            <h2>검색 결과: {searchResults.length}건</h2>
            {/* map을 사용해 배열 안의 숙소들을 하나씩 화면에 그리기 */}
            {searchResults.map((room) => (
              <div key={room._id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
                <img src={room.imageUrl} alt={room.name} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h3>{room.name}</h3>
                  <p style={{ color: 'gray' }}>{room.location} · 최대 인원 {room.maxGuests}명</p>
                  <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>₩{room.price.toLocaleString()} / 박</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'gray', marginTop: '2rem' }}>여행지와 인원을 선택하고 검색해 보세요!</p>
        )}
      </div>

    </div>
  );
}

export default App;