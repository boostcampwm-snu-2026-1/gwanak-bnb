function GuestSelector({ summaryText, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'min-w-0 w-full rounded-full px-7 py-4 text-left transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300',
        isSelected
          ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
          : 'hover:bg-zinc-100',
      ].join(' ')}
    >
      <p className="text-[11px] font-semibold tracking-[0.02em] text-zinc-900">
        여행자
      </p>
      <p
        className={`mt-1 truncate text-sm ${
          isSelected ? 'text-zinc-900' : 'text-zinc-500'
        }`}
      >
        {summaryText}
      </p>
    </button>
  )
}

export default GuestSelector
