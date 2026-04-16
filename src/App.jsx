import { useState } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import styles from './App.module.css';

function App() {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [results, setResults] = useState(null);

  async function handleSearch() {
    const totalGuests = guests.adults + guests.children;

    if (!location || totalGuests === 0) {
      alert('여행지와 인원수를 입력해주세요.');
      return;
    }

    const params = new URLSearchParams({
      location,
      guests: totalGuests,
    });

    const res = await fetch(`http://localhost:3001/api/accommodations/search?${params}`);
    const data = await res.json();
    setResults(data);
  }

  function handleReset() {
    setLocation('');
    setGuests({ adults: 0, children: 0, infants: 0, pets: 0 });
    setResults(null);
  }

  return (
    <div>
      <Header onLogoClick={handleReset} />
      <main className={styles.main}>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            location={location}
            onLocationChange={setLocation}
            guests={guests}
            onGuestsChange={setGuests}
            onSearch={handleSearch}
          />
        </div>
        <SearchResults results={results} />
      </main>
    </div>
  );
}

export default App;
