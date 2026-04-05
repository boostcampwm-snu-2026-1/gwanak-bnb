import { GuestDropdown } from "./dropdown/GuestDropdown";
import { useGuestCount } from "../../../hooks/useGuestCounts";

export const SearchBar = () => {
  const { counts, decreaseCount, increaseCount } = useGuestCount({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });

  return (
    <div>
      <GuestDropdown
        counts={counts}
        decreaseCount={decreaseCount}
        increaseCount={increaseCount}
      />
    </div>
  );
};
