import { GUEST_TYPES } from "../../../../constants/guest";
import type {
  GuestCategory,
  GuestCounts,
  GuestDisabledStates,
} from "../../../../hooks/useGuestCount";
import { Dropdown } from "../../../common/Dropdown";
import { GuestCounter } from "./GuestCounter";

type GuestDropdownProps = {
  counts: GuestCounts;
  decreaseCount: (guestCategory: GuestCategory) => void;
  increaseCount: (guestCategory: GuestCategory) => void;
  disabledStates: GuestDisabledStates;
};

export const GuestDropdown = ({
  counts,
  decreaseCount,
  increaseCount,
  disabledStates,
}: GuestDropdownProps) => {
  return (
    <Dropdown>
      <div className="flex flex-col">
        {GUEST_TYPES.map((item) => (
          <GuestCounter
            key={item.category}
            title={item.title}
            description={item.description}
            count={counts[item.category]}
            buttonDisabledStates={disabledStates[item.category]}
            onDecrease={() => decreaseCount(item.category)}
            onIncrease={() => increaseCount(item.category)}
          />
        ))}
      </div>
    </Dropdown>
  );
};
