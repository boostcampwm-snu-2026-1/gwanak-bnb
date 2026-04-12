import DestinationSelector from './DestinationSelector.jsx'
import DateSelector from './DateSelector.jsx'
import DateModal from './DateModal.jsx'
import GuestSelector from './GuestSelector.jsx'
import GuestModal from './GuestModal.jsx'
import { SearchIcon } from './icons'

function SearchBar({
  activeTab,
  destinationSelection,
  dateSelection,
  dateActions,
  guestSelection,
  onSelectTab,
  onChangeGuestCount,
}) {
  return (
    <section className="relative rounded-full border border-zinc-200/80 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-[minmax(0,1.15fr)_auto_minmax(0,0.95fr)_auto_minmax(0,1fr)_auto] items-center">
        <DestinationSelector
          summaryText={destinationSelection.summaryText}
          hasValue={destinationSelection.hasValue}
          isSelected={activeTab === 'destination'}
          onSelect={() => onSelectTab('destination')}
        />

        <div className="h-8 w-px bg-zinc-200" />

        <DateSelector
          summaryText={dateSelection.summaryText}
          hasValue={dateSelection.hasValue}
          isSelected={activeTab === 'date'}
          onSelect={() => onSelectTab('date')}
        />

        <div className="h-8 w-px bg-zinc-200" />

        <div className="relative">
          <GuestSelector
            summaryText={guestSelection.summaryText}
            hasValue={guestSelection.hasValue}
            isSelected={activeTab === 'guests'}
            onSelect={() => onSelectTab('guests')}
          />

          {activeTab === 'guests' ? (
            <div className="absolute right-0 top-full z-30 mt-3">
              <GuestModal
                guests={guestSelection.guests}
                onChangeGuestCount={onChangeGuestCount}
              />
            </div>
          ) : null}
        </div>

        <button
          type="button"
          aria-label="검색"
          className="ml-2 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-[0_8px_18px_rgba(255,56,92,0.35)] transition duration-200 hover:scale-105 hover:shadow-[0_10px_22px_rgba(255,56,92,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
        >
          <SearchIcon />
        </button>
      </div>

      {activeTab === 'date' ? (
        <div className="absolute left-1/2 top-full z-30 mt-4 w-[880px] max-w-[calc(100vw-2rem)] -translate-x-1/2">
          <DateModal {...dateSelection} {...dateActions} />
        </div>
      ) : null}
    </section>
  )
}

export default SearchBar
