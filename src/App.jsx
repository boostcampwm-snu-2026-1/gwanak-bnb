import './App.css'
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';
import RoomCard from './components/Room/RoomCard';

function App() {
  const [rooms, setRooms] = useState([]);

  return (
    <div className="App">
      <Header />
      <SearchBar setRooms={setRooms} />

      <main className="container">
        {rooms.length > 0 ? (
          <div className="room-grid">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;