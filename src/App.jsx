import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Listings from './components/listings/Listings';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Categories />
      <Listings />
    </div>
  );
}

export default App;
