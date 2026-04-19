import { useCallback, useState } from 'react'
import { searchListings } from './api/listings'
import { GuestPickerModal } from './components/GuestPickerModal'
import {
  totalStayingGuests,
  type GuestCounts,
} from './components/guestPickerUtils'
import { SearchBar } from './components/search-bar/SearchBar'
import {
  SearchResultsSection,
  type SearchUiState,
} from './components/search-results/SearchResultsSection'
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
  const [destinationId, setDestinationId] = useState<string | null>(null)
  const [searchState, setSearchState] = useState<SearchUiState>({
    status: 'idle',
  })
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  const runSearch = useCallback(async () => {
    setValidationMessage(null)

    if (!destinationId) {
      setValidationMessage('여행지를 선택해 주세요.')
      return
    }

    if (totalStayingGuests(guests) < 1) {
      setValidationMessage('여행 인원(성인·아동)을 1명 이상 선택해 주세요.')
      return
    }

    setSearchState({ status: 'loading' })

    try {
      const { listings } = await searchListings({
        destinationId,
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        pets: guests.pets,
      })
      setSearchState({ status: 'success', listings })
    } catch (e) {
      const message =
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.'
      setSearchState({ status: 'error', message })
    }
  }, [destinationId, guests])

  return (
    <div className="app-demo">
      <SearchBar
        guests={guests}
        onGuestsOpen={() => setModalOpen(true)}
        guestPickerOpen={modalOpen}
        committedDestinationId={destinationId}
        onCommittedDestinationIdChange={setDestinationId}
        onSearchClick={runSearch}
        searchDisabled={searchState.status === 'loading'}
      />

      <GuestPickerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        value={guests}
        onChange={setGuests}
      />

      <SearchResultsSection state={searchState} validationMessage={validationMessage} />
    </div>
  )
}

export default App
