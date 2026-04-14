import type { CountButtonDisabledState } from "../../../../hooks/useGuestCount";
import { IconButton } from "../../../common/IconButton";
import { Plus, Minus } from "lucide-react";

type GuestCounterProps = {
  title: string;
  description: string;
  count: number;
  buttonDisabledStates: CountButtonDisabledState;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const GuestCounter = ({
  title,
  description,
  count,
  buttonDisabledStates,
  onDecrease,
  onIncrease,
}: GuestCounterProps) => {
  return (
    <div className="flex min-w-[330px] flex-row flex-nowrap items-center justify-between gap-2.5 border-b border-b-[#ebebeb] py-6 last:border-none">
      <div className="flex-row">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="pt-1 text-sm font-normal text-[#6a6a6a]">{description}</p>
      </div>
      <div className="flex w-[100px] flex-row items-center justify-between">
        <IconButton
          onClick={onDecrease}
          disabled={buttonDisabledStates.decrease}
        >
          <Minus />
        </IconButton>
        <p className="text-base">{count}</p>
        <IconButton
          onClick={onIncrease}
          disabled={buttonDisabledStates.increase}
        >
          <Plus />
        </IconButton>
      </div>
    </div>
  );
};
