import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface GuestFilter {
  adult: number;
  kids: number;
  infant: number;
  pets: number;
}

const FILTER_LABELS: Record<
  keyof GuestFilter,
  { label: string; description: string }
> = {
  adult: { label: "성인", description: "13세 이상" },
  kids: { label: "어린이", description: "2세 ~ 12세" },
  infant: { label: "유아", description: "2세 미만" },
  pets: { label: "반려동물", description: "보조동물을 동반하시나요?" },
};

export default function GuestFilterSelectPopover() {
  const [guestFilter, setGuestFilter] = useState<GuestFilter>({
    adult: 0,
    kids: 0,
    infant: 0,
    pets: 0,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">검색</Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        style={{
          borderRadius: "16px",
        }}
      >
        {Object.entries(FILTER_LABELS).map(([key, { label, description }]) => (
          <CounterRow
            key={key}
            label={label}
            description={description}
            value={guestFilter[key as keyof GuestFilter]}
            onChange={(value) =>
              setGuestFilter((prev) => ({
                ...prev,
                [key]: value,
              }))
            }
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}

interface CounterRowProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

const CounterRow = ({
  label,
  description,
  value,
  onChange,
}: CounterRowProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <div>
        <div>{label}</div>
        <div style={{ fontSize: "12px", color: "#666" }}>{description}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => onChange(value - 1)} disabled={value === 0}>
          -
        </button>
        <span style={{ margin: "0 12px" }}>{value}</span>
        <button onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
};
