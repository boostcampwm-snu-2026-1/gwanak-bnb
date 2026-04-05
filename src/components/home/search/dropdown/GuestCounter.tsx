import { IconButton } from "../../../common/IconButton";
import { Plus, Minus } from "lucide-react";

type GuestCounterProp = {
  title: string;
  description: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const GuestCounter = ({
  title,
  description,
  count,
  onDecrease,
  onIncrease,
}: GuestCounterProp) => {
  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div className="flex w-[100px] flex-row items-center justify-between">
        <IconButton onClick={onDecrease} disabled={count === 0}>
          <Minus />
        </IconButton>
        <p className="text-base">{count}</p>
        <IconButton onClick={onIncrease}>
          <Plus />
        </IconButton>
      </div>
    </div>
  );
};
