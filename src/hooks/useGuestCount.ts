import { useState } from "react";
import { MAX_GUESTS, MAX_INFANTS, MAX_PETS } from "../constants/guest";

export type GuestCategory = "adult" | "child" | "infant" | "pet";
export type GuestCounts = {
  adult: number;
  child: number;
  infant: number;
  pet: number;
};
export type CountButtonDisabledState = {
  decrease: boolean;
  increase: boolean;
};
export type GuestDisabledStates = Record<
  GuestCategory,
  CountButtonDisabledState
>;

export const useGuestCount = (initialCounts: GuestCounts) => {
  const [counts, setCounts] = useState(initialCounts);
  const totalGuests = counts.adult + counts.child;

  const disabledStates = {
    adult: {
      decrease:
        counts.adult <= 0 ||
        (counts.adult === 1 &&
          (counts.child >= 1 || counts.infant >= 1 || counts.pet >= 1)),
      increase: totalGuests >= MAX_GUESTS,
    },
    child: {
      decrease: counts.child <= 0,
      increase: totalGuests >= MAX_GUESTS,
    },
    infant: {
      decrease: counts.infant <= 0,
      increase: counts.infant >= MAX_INFANTS,
    },
    pet: {
      decrease: counts.pet <= 0,
      increase: counts.pet >= MAX_PETS,
    },
  };

  const decreaseCount = (category: GuestCategory) => {
    setCounts((prev) => {
      if (disabledStates[category].decrease) return prev;

      const next = { ...prev };
      next[category] -= 1;
      return next;
    });
  };

  const increaseCount = (category: GuestCategory) => {
    setCounts((prev) => {
      if (disabledStates[category].increase) return prev;

      const next = { ...prev };
      if (category !== "adult" && prev.adult === 0) {
        next.adult = 1;
      }
      next[category] += 1;
      return next;
    });
  };

  const resetCount = () => setCounts(initialCounts);

  return { counts, disabledStates, decreaseCount, increaseCount, resetCount };
};
