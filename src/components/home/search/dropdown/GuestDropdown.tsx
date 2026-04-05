import { GUEST_TYPES } from "../../../../constants/guest";
import type {
  GuestCategory,
  GuestCounts,
} from "../../../../hooks/useGuestCounts";
import { Dropdown } from "../../../common/Dropdown";
import { GuestCounter } from "./GuestCounter";

type GuestDropdownProps = {
  counts: GuestCounts;
  decreaseCount: (guestCategory: GuestCategory) => void;
  increaseCount: (guestCategory: GuestCategory) => void;
};

export const GuestDropdown = ({
  counts,
  decreaseCount,
  increaseCount,
}: GuestDropdownProps) => {
  return (
    <Dropdown>
      {GUEST_TYPES.map((item) => (
        <GuestCounter
          key={item.category}
          title={item.title}
          description={item.description}
          count={counts[item.category]}
            onDecrease={() => decreaseCount(item.category)}
            onIncrease={() => increaseCount(item.category)}
          />
        />
      ))}
    </Dropdown>
  );
};
