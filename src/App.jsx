import { useEffect, useMemo, useRef, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [activeTab, setActiveTab] = useState(null)

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const searchAreaRef = useRef(null)

  const totalGuests = guests.adults + guests.children
  const summaryText = useMemo(() => {
    const guestLabel = totalGuests === 0 ? '게스트 추가' : `게스트 ${totalGuests}명`
    const extraLabels = []

    if (guests.infants > 0) {
      extraLabels.push(`유아 ${guests.infants}명`)
    }

    if (guests.pets > 0) {
      extraLabels.push(`반려동물 ${guests.pets}마리`)
    }

    if (extraLabels.length === 0) {
      return guestLabel
    }

    return `${guestLabel} · ${extraLabels.join(' · ')}`
  }, [guests.infants, guests.pets, totalGuests])

  const handleSelectTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab))
  }

  const handleGuestCountChange = (type, delta) => {
    setGuests((prev) => {
      const next = { ...prev }

      if (type === 'adults') {
        const hasDependentGuests =
          prev.children > 0 || prev.infants > 0 || prev.pets > 0
        const minAdults = hasDependentGuests ? 1 : 0
        next.adults = Math.max(minAdults, prev.adults + delta)
        return next
      }

      next[type] = Math.max(0, prev[type] + delta)

      const hasDependentGuests =
        next.children > 0 || next.infants > 0 || next.pets > 0

      if (hasDependentGuests && next.adults === 0) {
        next.adults = 1
      }

      return next
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target)
      ) {
        setActiveTab(null)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveTab(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 sm:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
          <p className="font-montserrat text-lg font-bold tracking-tight text-rose-500">
            gwanakbnb
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            어디로 떠나볼까요?
          </h1>

          <div className="mt-8 pb-2">
            <div ref={searchAreaRef} className="min-w-[720px]">
              <SearchBar
                activeTab={activeTab}
                summaryText={summaryText}
                onSelectTab={handleSelectTab}
                guests={guests}
                onChangeGuestCount={handleGuestCountChange}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
