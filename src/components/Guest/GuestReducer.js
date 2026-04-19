export const INITIAL_GUESTS = { adults: 0, children: 0, infants: 0, pets: 0 };

export const GUEST_LIMITS = {
  guests:   { min: 0, max: 16 },
  infants:  { min: 0, max: 5 },
  pets:     { min: 0, max: 5 },
}

export function guestReducer(state, action) {
  const { type, delta, payload } = action;

  if (type === 'RESET') return INITIAL_GUESTS;
  if (type === 'REPLACE') return payload || INITIAL_GUESTS;

  const nextValue = state[type] + delta;
  const totalGuests = state.adults + state.children;

  if (nextValue < 0) return state; // 0 미만으로 내려가는 경우 방지

  switch (type) {
    case 'adults':
      // 다른 게스트가 있는데 성인을 0으로 만들려고 하면 차단
      if (delta < 0 && nextValue < 1) {
        const hasDependent = state.children > 0 || state.infants > 0 || state.pets > 0;
        if (hasDependent) return state;
      }
      if (delta > 0 && totalGuests >= GUEST_LIMITS.guests.max) return state;
      break;

    case 'children':
      if (delta > 0) {
        if (totalGuests >= GUEST_LIMITS.guests.max) return state;
        if (state.adults === 0) return { ...state, adults: 1, children: nextValue };
      }
      break;

    case 'infants':
    case 'pets':
      if (delta > 0) {
        if (nextValue > GUEST_LIMITS[type].max) return state;
        if (state.adults === 0) return { ...state, adults: 1, [type]: nextValue };
      }
      break;

    default:
      return state;
  }

  return { ...state, [type]: nextValue };
}