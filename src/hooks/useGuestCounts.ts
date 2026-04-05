import { useState } from "react";

export type GuestCategory = "adult" | "child" | "infant" | "pet";
export type GuestCounts = {
  adult: number;
  child: number;
  infant: number;
  pet: number;
};

export const useGuestCount = (initialCounts: GuestCounts) => {
  const [counts, setCounts] = useState(initialCounts);

  const updateCount = (category: GuestCategory, value: number) => {
    setCounts((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] + value),
    }));
  };

  const increaseCount = (category: GuestCategory) => updateCount(category, 1);
  const decreaseCount = (category: GuestCategory) => updateCount(category, -1);
  const resetCount = () => setCounts(initialCounts);

  return { counts, increaseCount, decreaseCount, resetCount };
};
