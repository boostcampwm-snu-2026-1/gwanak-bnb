import { MinusIcon, PlusIcon } from '../icons'

function GuestRow({
  label,
  description,
  count,
  onIncrease,
  onDecrease,
  isDecreaseDisabled,
  isIncreaseDisabled,
}) {
  const controlBaseClass =
    'inline-flex h-8 w-8 items-center justify-center rounded-full border transition'

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-base font-semibold text-zinc-900">{label}</p>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={isDecreaseDisabled}
          aria-label={`${label} 감소`}
          className={[
            controlBaseClass,
            isDecreaseDisabled
              ? 'cursor-not-allowed border-zinc-200 text-zinc-300'
              : 'border-zinc-400 text-zinc-700 hover:border-zinc-600',
          ].join(' ')}
        >
          <MinusIcon />
        </button>

        <span className="w-5 text-center text-sm font-medium text-zinc-800">
          {count}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={isIncreaseDisabled}
          aria-label={`${label} 증가`}
          className={[
            controlBaseClass,
            isIncreaseDisabled
              ? 'cursor-not-allowed border-zinc-200 text-zinc-300'
              : 'border-zinc-400 text-zinc-700 hover:border-zinc-600',
          ].join(' ')}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}

export default GuestRow
