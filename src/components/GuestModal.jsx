function GuestRow({
  label,
  description,
  count,
  onIncrease,
  onDecrease,
  isDecreaseDisabled,
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
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>

        <span className="w-5 text-center text-sm font-medium text-zinc-800">
          {count}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          aria-label={`${label} 증가`}
          className={`${controlBaseClass} border-zinc-400 text-zinc-700 hover:border-zinc-600`}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function GuestModal({ guests, onChangeGuestCount }) {
  const hasDependentGuests =
    guests.children > 0 || guests.infants > 0 || guests.pets > 0
  const isAdultDecreaseDisabled = guests.adults <= (hasDependentGuests ? 1 : 0)

  return (
    <section className="-mt-1 px-5">
      <div className="w-[400px] rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <GuestRow
          label="성인"
          description="13세 이상"
          count={guests.adults}
          onIncrease={() => onChangeGuestCount('adults', 1)}
          onDecrease={() => onChangeGuestCount('adults', -1)}
          isDecreaseDisabled={isAdultDecreaseDisabled}
        />

        <div className="h-px bg-zinc-100" />

        <GuestRow
          label="어린이"
          description="2세~12세"
          count={guests.children}
          onIncrease={() => onChangeGuestCount('children', 1)}
          onDecrease={() => onChangeGuestCount('children', -1)}
          isDecreaseDisabled={guests.children === 0}
        />

        <div className="h-px bg-zinc-100" />

        <GuestRow
          label="유아"
          description="2세 미만"
          count={guests.infants}
          onIncrease={() => onChangeGuestCount('infants', 1)}
          onDecrease={() => onChangeGuestCount('infants', -1)}
          isDecreaseDisabled={guests.infants === 0}
        />

        <div className="h-px bg-zinc-100" />

        <GuestRow
          label="반려동물"
          description="보조동물을 동반하시나요?"
          count={guests.pets}
          onIncrease={() => onChangeGuestCount('pets', 1)}
          onDecrease={() => onChangeGuestCount('pets', -1)}
          isDecreaseDisabled={guests.pets === 0}
        />
      </div>
    </section>
  )
}

export default GuestModal
