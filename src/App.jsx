import Header from './components/Header';
import Categories from './components/Categories';
import Listings from './components/Listings';
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
