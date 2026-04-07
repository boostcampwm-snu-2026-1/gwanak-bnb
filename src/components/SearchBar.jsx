import DestinationSelector from './DestinationSelector.jsx'
import DateSelector from './DateSelector.jsx'
import GuestSelector from './GuestSelector.jsx'
import GuestModal from './GuestModal.jsx'
import { SearchIcon } from './icons'

function SearchBar({
  activeTab,
  summaryText,
  onSelectTab,
  guests,
  onChangeGuestCount,
}) {
  return (
    <section className="rounded-full border border-zinc-200/80 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-[minmax(0,1.15fr)_auto_minmax(0,0.95fr)_auto_minmax(0,1fr)_auto] items-center">
        <DestinationSelector
          isSelected={activeTab === 'destination'}
          onSelect={() => onSelectTab('destination')}
        />

        <div className="h-8 w-px bg-zinc-200" />

        <DateSelector
          isSelected={activeTab === 'date'}
          onSelect={() => onSelectTab('date')}
        />

        <div className="h-8 w-px bg-zinc-200" />

        <div className="relative">
          <GuestSelector
            summaryText={summaryText}
            isSelected={activeTab === 'guests'}
            onSelect={() => onSelectTab('guests')}
          />

          {activeTab === 'guests' ? (
            <div className="absolute right-0 top-full z-30 mt-3">
              <GuestModal
                guests={guests}
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
    </section>
  )
}

export default SearchBar
