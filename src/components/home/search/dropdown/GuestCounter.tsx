import { IconButton } from "../../../common/IconButton";
import { Plus, Minus } from "lucide-react";

type GuestCounterProp = {
  title: string;
  description: string;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const GuestCounter = ({
  title,
  description,
  count,
  onIncrease,
  onDecrease,
}: GuestCounterProp) => {
  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div>
        <IconButton onClick={onIncrease}>
          <Plus />
        </IconButton>
        <p>{count}</p>
        <IconButton onClick={onDecrease} disabled={count === 0}>
          <Minus />
        </IconButton>
      </div>
    </div>
  );
};
