import { useMemo, useState } from 'react';
import { searchAccommodations } from './api/accommodations';
import AccommodationResults from './components/AccommodationResults/AccommodationResults';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

function App() {
  const [selectedDestination, setSelectedDestination] = useState('서귀포시');
  const [guests, setGuests] = useState({
    adult: 3,
    child: 0,
    infant: 1,
    pet: 1,
  });
  const [accommodations, setAccommodations] = useState([]);
  const [searchedDestination, setSearchedDestination] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalGuests = guests.adult + guests.child;

  const guestSummary = useMemo(() => {
    const labels = [];

    if (totalGuests > 0) {
      labels.push(`게스트 ${totalGuests}명`);
    }

    if (guests.infant > 0) {
      labels.push(`유아 ${guests.infant}명`);
    }

    if (guests.pet > 0) {
      labels.push(`반려동물 ${guests.pet}마리`);
    }

    return labels.length > 0 ? labels.join(', ') : '여행자 추가';
  }, [guests, totalGuests]);

  async function handleSearch() {
    if (!selectedDestination) {
      setErrorMessage('여행지를 먼저 선택해주세요.');
      setHasSearched(true);
      return;
    }

    if (totalGuests < 1) {
      setErrorMessage('게스트를 1명 이상 선택해주세요.');
      setHasSearched(true);
      return;
    }

    setHasSearched(true);
    setIsLoading(true);
    setErrorMessage('');
    setSearchedDestination(selectedDestination);

    try {
      const result = await searchAccommodations({
        destination: selectedDestination,
        guests: totalGuests,
      });

      setAccommodations(result.data);
    } catch (error) {
      setAccommodations([]);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <SearchBar
        selectedDestination={selectedDestination}
        onDestinationChange={setSelectedDestination}
        guestSummary={guestSummary}
        guests={guests}
        onGuestsChange={setGuests}
        isLoading={isLoading}
        onSearch={handleSearch}
      />
      <AccommodationResults
        accommodations={accommodations}
        destination={searchedDestination || selectedDestination}
        isLoading={isLoading}
        errorMessage={errorMessage}
        hasSearched={hasSearched}
      />
    </main>
  );
}

export default App;
