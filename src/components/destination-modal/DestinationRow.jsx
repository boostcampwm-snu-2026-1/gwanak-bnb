import { MapPinIcon } from '../icons'

function DestinationRow({
  title,
  address,
  placeType,
  isSelected = false,
  onClick,
}) {
  const description = `${address} · ${placeType}`

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={[
        'flex min-h-20 w-full items-center gap-4 rounded-[24px] px-4 py-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300',
        isSelected
          ? 'bg-zinc-100 shadow-[inset_0_0_0_1px_rgba(24,24,27,0.08)]'
          : 'hover:bg-zinc-50',
      ].join(' ')}
    >
      <span
        className={[
          'inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition',
          isSelected
            ? 'bg-zinc-900 text-white'
            : 'bg-sky-50 text-sky-600',
        ].join(' ')}
      >
        <MapPinIcon />
      </span>

      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-zinc-900">
          {title}
        </span>
        <span className="mt-1 block truncate text-sm text-zinc-500">
          {description}
        </span>
      </span>
    </button>
  )
}

export default DestinationRow
