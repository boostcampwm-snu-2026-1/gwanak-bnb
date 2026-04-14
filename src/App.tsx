import { useState } from 'react'
import { GuestPickerModal } from './components/GuestPickerModal'
import type { GuestCounts } from './components/guestPickerUtils'
import { SearchBar } from './components/search-bar/SearchBar'
import './App.css'

const initialGuests: GuestCounts = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [guests, setGuests] = useState<GuestCounts>(initialGuests)

  return (
    <div className="app-demo">
      <SearchBar
        guests={guests}
        onGuestsOpen={() => setModalOpen(true)}
        guestPickerOpen={modalOpen}
      />

      <GuestPickerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        value={guests}
        onChange={setGuests}
      />
    </div>
  )
}

export default App
