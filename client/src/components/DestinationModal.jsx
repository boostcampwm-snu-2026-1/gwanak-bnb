import DestinationRow from './destination-modal/DestinationRow.jsx'
import {
  DESTINATION_SCROLL_MAX_HEIGHT,
  MAX_VISIBLE_DESTINATION_ROWS,
} from '../constants/destinationModal.js'

function DestinationModal({
  destinations,
  onSelectDestination,
}) {
  const shouldScroll = destinations.length > MAX_VISIBLE_DESTINATION_ROWS

  return (
    <section className="rounded-[32px] border border-zinc-200/80 bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:p-4">
      <div
        className={shouldScroll ? 'overflow-y-auto pr-1' : undefined}
        style={
          shouldScroll
            ? { maxHeight: `${DESTINATION_SCROLL_MAX_HEIGHT}px` }
            : undefined
        }
      >
        <div className="space-y-1">
          {destinations.map((destination) => (
            <DestinationRow
              key={destination.id}
              title={destination.title}
              address={destination.address}
              placeType={destination.placeType}
              onClick={() => onSelectDestination?.(destination)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationModal
