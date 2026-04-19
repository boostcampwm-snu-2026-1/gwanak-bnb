import { useState } from 'react'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import ListingSection from './components/Listing/ListingSection'
import SearchResultsSection from './components/Listing/SearchResultsSection'
import { fetchListings } from './apis/listings'
import { listingSections } from './mocks/listings'
import styles from './App.module.css'

function App() {
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })
  const [searchResults, setSearchResults] = useState([])
  const [searchFilters, setSearchFilters] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  const handleSearch = async (filters) => {
    setIsLoading(true)
    setSearchError('')
    setHasSearched(true)
    setSearchFilters(filters)

    try {
      const response = await fetchListings(filters)

      setSearchFilters(response.filters)
      setSearchResults(response.items)
    } catch (error) {
      setSearchError(error.message || '검색 결과를 불러오지 못했습니다.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.app}>
      <Header />
      <SearchBar
        guestCounts={guestCounts}
        setGuestCounts={setGuestCounts}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <main className={styles.mainContent}>
        {hasSearched ? (
          <SearchResultsSection
            listings={searchResults}
            filters={searchFilters}
            isLoading={isLoading}
            errorMessage={searchError}
          />
        ) : (
          listingSections.map((section) => (
            <ListingSection
              key={section.title}
              title={section.title}
              listings={section.listings}
            />
          ))
        )}
      </main>
    </div>
  )
}

export default App
