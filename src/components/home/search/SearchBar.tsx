import { GuestDropdown } from "./dropdown/GuestDropdown";
import { useGuestCount } from "../../../hooks/useGuestCounts";

export const SearchBar = () => {
  const { counts, increaseCount, decreaseCount } = useGuestCount({
    adult: 0,
    child: 0,
    infant: 0,
    pet: 0,
  });

  return (
    <div>
      <GuestDropdown
        counts={counts}
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
      />
    </div>
  );
};
