import { useState } from 'react'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import AccommodationCard from './components/AccommodationCard/AccommodationCard'
import Footer from './components/Footer/Footer'
import accommodations from './data/accommodations'
import './App.css'

function App() {
  const [searchState, setSearchState] = useState(null)

  return (
    <div className="app">
      <Header />
      <main className="main">
        <SearchBar onSearch={setSearchState} />
        {searchState ? (
          <SearchResults
            location={searchState.location}
            count={searchState.count}
            results={searchState.results}
            error={searchState.error}
          />
        ) : (
          <section className="accommodation-list">
            {accommodations.map((item) => (
              <AccommodationCard key={item.id} accommodation={item} />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
