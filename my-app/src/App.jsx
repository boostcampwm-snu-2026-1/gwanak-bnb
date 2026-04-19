import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';

function App() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async ({ city, guests }) => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (guests) params.append('guests', guests);

    const res = await fetch(`http://localhost:3000/api/accommodates?${params}`);
    const data = await res.json();
    setResults(data);
    setHasSearched(true);
  };

  return (
    <BrowserRouter>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={<MainPage results={results} hasSearched={hasSearched} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
