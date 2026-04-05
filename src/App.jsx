import { useState } from 'react'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import ListingSection from './components/Listing/ListingSection'
import { listingSections } from './mocks/listings'
import styles from './App.module.css'

function App() {
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })

  return (
    <div className={styles.app}>
      <Header />
      <SearchBar guestCounts={guestCounts} setGuestCounts={setGuestCounts} />

      <main className={styles.mainContent}>
        {listingSections.map((section) => (
          <ListingSection
            key={section.title}
            title={section.title}
            listings={section.listings}
          />
        ))}
      </main>
    </div>
  )
}

export default App
