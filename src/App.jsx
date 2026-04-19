import { useState } from 'react';
import GuestSelector from './components/Guest/GuestSelector';
import DestinationSelector from './components/Destination/DestinationSelector';
import SearchResults from './components/SearchResults/SearchResults';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function App() {
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const totalGuests = guests.adults + guests.children;

  const handleSearch = async () => {
    setError('');

    if (!destination.trim()) {
      setError('여행지를 입력해주세요.');
      return;
    }

    if (totalGuests <= 0) {
      setError('성인 또는 어린이 수를 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        destination: destination.trim(),
        adults: String(guests.adults),
        children: String(guests.children),
        infants: String(guests.infants),
        pets: String(guests.pets)
      });

      const response = await fetch(`${API_BASE_URL}/api/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '검색 중 문제가 발생했습니다.');
        setResults([]);
      } else {
        setResults(data.results || []);
      }
    } catch (fetchError) {
      setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-black text-rose-500 tracking-tighter">관악BNB</h1>
      </header>
      
      <main className="w-full max-w-5xl">
        <div className="flex flex-col gap-6 rounded-3xl bg-white border border-gray-200 p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <DestinationSelector value={destination} onChange={setDestination} />
            </div>

            <div className="h-8 w-full bg-transparent lg:w-px lg:h-12 lg:bg-gray-200" />

            <div className="flex-1">
              <GuestSelector value={guests} onChange={setGuests} />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-full bg-rose-500 px-6 text-white transition hover:bg-rose-600 sm:mt-0 sm:w-auto"
              disabled={loading}
            >
              {loading ? '검색 중...' : '검색'}
            </button>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-3xl bg-red-50 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>

        <SearchResults results={results} />
      </main>
    </div>
  );
}

export default App;