import { useState } from 'react';
import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';

function App() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async ({ city, guests }) => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/accommodations/search?city=${encodeURIComponent(city)}&guests=${guests}`
            );
            const data = await res.json();
            setResults(data);
        } catch (e) {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='app'>
            <Header onSearch={handleSearch} />
            <main className='main-content'>
                <SearchResults results={results} loading={loading} />
            </main>
        </div>
    );
}

export default App;
