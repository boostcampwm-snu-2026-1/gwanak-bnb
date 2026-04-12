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
      className={[
        'flex w-full items-center gap-4 rounded-[24px] px-4 py-3 text-left transition',
        isSelected
          ? 'bg-zinc-100'
          : 'hover:bg-zinc-50',
      ].join(' ')}
    >
      <span className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
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
