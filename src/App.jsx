import { useState } from 'react';
import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Listings from './components/listings/Listings';
import './App.css';

function App() {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    guests: 0,
    infants: 0,
    checkIn: '',
    checkOut: '',
  });

  return (
    <div className="app">
      <Header searchFilters={searchFilters} onSearch={setSearchFilters} />
      <Categories />
      <Listings searchFilters={searchFilters} />
    </div>
  );
}

export default App;
