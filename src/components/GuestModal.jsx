import { Fragment } from 'react'
import {
  MAX_INFANTS,
  MAX_PETS,
  MAX_PRIMARY_GUESTS,
  MIN_ADULTS_WITH_DEPENDENTS,
} from '../constants/guestLimits.js'
import { GUEST_ROWS } from '../constants/guestRow.js'
import GuestRow from './guest-modal/GuestRow.jsx'

function GuestModal({ guests, onChangeGuestCount }) {
  const totalPrimaryGuests = guests.adults + guests.children
  const hasDependentGuests =
    guests.children > 0 || guests.infants > 0 || guests.pets > 0
  const isAdultDecreaseDisabled =
    guests.adults <=
    (hasDependentGuests ? MIN_ADULTS_WITH_DEPENDENTS : 0)
  const isPrimaryIncreaseDisabled = totalPrimaryGuests >= MAX_PRIMARY_GUESTS

  const getDecreaseDisabledState = (type) => {
    if (type === 'adults') {
      return isAdultDecreaseDisabled
    }

    return guests[type] === 0
  }

  const getIncreaseDisabledState = (type) => {
    if (type === 'adults' || type === 'children') {
      return isPrimaryIncreaseDisabled
    }

    if (type === 'infants') {
      return guests.infants >= MAX_INFANTS
    }

    if (type === 'pets') {
      return guests.pets >= MAX_PETS
    }

    return false
  }

  return (
    <section className="-mt-1 px-5">
      <div className="w-[400px] rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        {GUEST_ROWS.map((row, index) => (
          <Fragment key={row.type}>
            <GuestRow
              label={row.label}
              description={row.description}
              count={guests[row.type]}
              onIncrease={() => onChangeGuestCount(row.type, 1)}
              onDecrease={() => onChangeGuestCount(row.type, -1)}
              isDecreaseDisabled={getDecreaseDisabledState(row.type)}
              isIncreaseDisabled={getIncreaseDisabledState(row.type)}
            />

            {index < GUEST_ROWS.length - 1 ? (
              <div className="h-px bg-zinc-100" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

export default GuestModal
