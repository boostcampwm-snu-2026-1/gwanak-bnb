import { useEffect, useMemo, useRef, useState } from 'react'
import DestinationRow from './destination-modal/DestinationRow.jsx'
import destinations from '../data/destinations.js'
import { filterDestinations } from '../utils/filterDestinations.js'

function DestinationModal({
  selectedDestination,
  onSelectDestination,
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filteredDestinations = useMemo(
    () => filterDestinations(query, destinations),
    [query],
  )

  const sectionTitle = query.trim() ? '검색 결과' : '추천 여행지'

  return (
    <section className="rounded-[32px] border border-zinc-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:p-8">
      <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 px-5 py-4">
        <label
          htmlFor="destination-search"
          className="block text-[11px] font-semibold tracking-[0.08em] text-zinc-500"
        >
          여행지
        </label>
        <input
          id="destination-search"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="여행지 검색"
          className="mt-2 w-full border-none bg-transparent p-0 text-base font-semibold text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-zinc-900">{sectionTitle}</p>

        <div className="mt-3 space-y-1">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <DestinationRow
                key={destination.id}
                title={destination.title}
                address={destination.address}
                placeType={destination.placeType}
                isSelected={selectedDestination?.id === destination.id}
                onClick={() => onSelectDestination?.(destination)}
              />
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-zinc-200 px-5 py-8 text-center text-sm text-zinc-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DestinationModal
