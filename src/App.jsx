import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { GuestSelectorModal } from './components/Modal'
import { useAccommodationSearch } from './hooks/useAccommodationSearch'
import SearchResults from './components/Search/SearchResults'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guestData, setGuestData] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
  const { results, isLoading, error, search } = useAccommodationSearch()

  const totalGuests = guestData.adults + guestData.children

  const handleGuestConfirm = (data) => {
    setGuestData(data)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onGuestClick={() => setIsModalOpen(true)}
        guestCount={totalGuests}
        onSearch={search}
      />
      <main>
        <SearchResults results={results} isLoading={isLoading} error={error} />
      </main>
      <GuestSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleGuestConfirm}
      />
    </div>
  )
}

export default App
