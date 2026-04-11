import { MinusIcon, PlusIcon } from './icons'
import {
  MAX_INFANTS,
  MAX_PETS,
  MAX_PRIMARY_GUESTS,
  MIN_ADULTS_WITH_DEPENDENTS,
} from '../constants/guestLimits.js'

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

function GuestModal({ guests, onChangeGuestCount }) {
  const totalPrimaryGuests = guests.adults + guests.children
  const hasDependentGuests =
    guests.children > 0 || guests.infants > 0 || guests.pets > 0
  const isAdultDecreaseDisabled =
    guests.adults <=
    (hasDependentGuests ? MIN_ADULTS_WITH_DEPENDENTS : 0)
  const isPrimaryIncreaseDisabled = totalPrimaryGuests >= MAX_PRIMARY_GUESTS

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
          isIncreaseDisabled={isPrimaryIncreaseDisabled}
        />

        <div className="h-px bg-zinc-100" />

        <GuestRow
          label="어린이"
          description="2~12세"
          count={guests.children}
          onIncrease={() => onChangeGuestCount('children', 1)}
          onDecrease={() => onChangeGuestCount('children', -1)}
          isDecreaseDisabled={guests.children === 0}
          isIncreaseDisabled={isPrimaryIncreaseDisabled}
        />

        <div className="h-px bg-zinc-100" />

        <GuestRow
          label="유아"
          description="2세 미만"
          count={guests.infants}
          onIncrease={() => onChangeGuestCount('infants', 1)}
          onDecrease={() => onChangeGuestCount('infants', -1)}
          isDecreaseDisabled={guests.infants === 0}
          isIncreaseDisabled={guests.infants >= MAX_INFANTS}
        />

        <div className="h-px bg-zinc-100" />

        <GuestRow
          label="반려동물"
          description="보조동물을 동반하시나요?"
          count={guests.pets}
          onIncrease={() => onChangeGuestCount('pets', 1)}
          onDecrease={() => onChangeGuestCount('pets', -1)}
          isDecreaseDisabled={guests.pets === 0}
          isIncreaseDisabled={guests.pets >= MAX_PETS}
        />
      </div>
    </section>
  )
}

export default GuestModal
