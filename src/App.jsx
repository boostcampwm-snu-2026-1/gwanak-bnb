import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { GuestSelectorModal } from './components/Modal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guestData, setGuestData] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })

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
      />
      <GuestSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleGuestConfirm}
      />
    </div>
  )
}

export default App
