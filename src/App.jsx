import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import AccommodationCard from './components/AccommodationCard/AccommodationCard'
import accommodations from './data/accommodations'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <SearchBar />
        <section className="accommodation-list">
          {accommodations.map((item) => (
            <AccommodationCard key={item.id} accommodation={item} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
