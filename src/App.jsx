import './App.css'
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';

function App() {
  const [rooms, setRooms] = useState([]);

  return (
    <div className="App">
      <Header />
      <SearchBar setRooms={setRooms} />

      <div className="room-container">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="room-card">
              <img src={room.imageUrl} alt={room.title} style={{width: '200px'}} />
              <h3>{room.title}</h3>
              <p>{room.destination}</p>
              <p>₩{room.pricePerNight} / 밤</p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다. (서귀포시를 검색해보세요!)</p>
        )}
      </div>
    </div>
  );
}

export default App;