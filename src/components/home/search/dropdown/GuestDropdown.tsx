import { GUEST_TYPES } from "../../../../constants/guest";
import type {
  GuestCategory,
  GuestCounts,
} from "../../../../hooks/useGuestCounts";
import { Dropdown } from "../../../common/Dropdown";
import { GuestCounter } from "./GuestCounter";

type GuestDropdownProps = {
  counts: GuestCounts;
  increaseCount: (guestCategory: GuestCategory) => void;
  decreaseCount: (guestCategory: GuestCategory) => void;
};

export const GuestDropdown = ({
  counts,
  increaseCount,
  decreaseCount,
}: GuestDropdownProps) => {
  return (
    <Dropdown>
      {GUEST_TYPES.map((item) => (
        <GuestCounter
          key={item.category}
          title={item.title}
          description={item.description}
          count={counts[item.category]}
          onIncrease={() => increaseCount(item.category)}
          onDecrease={() => decreaseCount(item.category)}
        />
      ))}
    </Dropdown>
  );
};
