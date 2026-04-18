import { ChevronIcon } from '../icons'

function NavigationButton({ direction, disabled = false, ariaLabel, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        'inline-flex h-10 w-10 items-center justify-center rounded-full border transition',
        disabled
          ? 'cursor-not-allowed border-zinc-200 text-zinc-300'
          : 'border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:bg-zinc-50',
      ].join(' ')}
    >
      <ChevronIcon direction={direction} />
    </button>
  )
}

export default NavigationButton
