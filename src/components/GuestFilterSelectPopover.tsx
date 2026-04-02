import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
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

function getGuestSummary(guestFilter: GuestFilter) {
  const totalGuests = guestFilter.adult + guestFilter.kids;

  if (totalGuests === 0 && guestFilter.infant === 0 && guestFilter.pets === 0) {
    return "게스트 추가";
  }

  const parts = [];

  if (totalGuests > 0) {
    parts.push(`게스트 ${totalGuests}명`);
  }
  if (guestFilter.infant > 0) {
    parts.push(`유아 ${guestFilter.infant}명`);
  }
  if (guestFilter.pets > 0) {
    parts.push(`반려동물 ${guestFilter.pets}마리`);
  }

  return parts.join(" · ");
}

export default function GuestFilterSelectPopover() {
  const [guestFilter, setGuestFilter] = useState<GuestFilter>({
    adult: 0,
    kids: 0,
    infant: 0,
    pets: 0,
  });
  const summary = getGuestSummary(guestFilter);
  const hasSelection = summary !== "게스트 추가";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-auto min-w-56 justify-between rounded-full px-4 py-3 text-left shadow-sm"
        >
          <span className="flex flex-col items-start">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Guests
            </span>
            <span className="text-sm font-medium text-foreground">{summary}</span>
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              hasSelection
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            선택
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 rounded-3xl p-4">
        <PopoverHeader className="gap-1 px-1 pb-2">
          <PopoverTitle className="text-base font-semibold text-foreground">
            게스트 선택
          </PopoverTitle>
          <PopoverDescription className="text-sm">
            숙박 인원과 유아, 반려동물 동반 여부를 설정하세요.
          </PopoverDescription>
        </PopoverHeader>

        <section className="overflow-hidden rounded-2xl border border-border/70 bg-background">
          {Object.entries(FILTER_LABELS).map(([key, { label, description }], index) => (
            <CounterRow
              key={key}
              label={label}
              description={description}
              value={guestFilter[key as keyof GuestFilter]}
              hasBorder={index < Object.keys(FILTER_LABELS).length - 1}
              onChange={(value) =>
                setGuestFilter((prev) => ({
                  ...prev,
                  [key]: value,
                }))
              }
            />
          ))}
        </section>

        <div className="flex items-center justify-between gap-3 px-1 pt-2">
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={() =>
              setGuestFilter({
                adult: 0,
                kids: 0,
                infant: 0,
                pets: 0,
              })
            }
          >
            초기화
          </Button>
          <Button type="button" className="rounded-full px-5">
            적용
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface CounterRowProps {
  label: string;
  description: string;
  value: number;
  hasBorder?: boolean;
  onChange: (value: number) => void;
}

const CounterRow = ({
  label,
  description,
  value,
  hasBorder = false,
  onChange,
}: CounterRowProps) => {
  return (
    <article
      className={`flex items-center justify-between gap-4 px-4 py-4 ${
        hasBorder ? "border-b border-border/70" : ""
      }`}
    >
      <header className="min-w-0 space-y-1">
        <h3 className="text-sm font-medium text-foreground">{label}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onChange(value - 1)}
          disabled={value === 0}
          aria-label={`${label} 감소`}
        >
          <Minus />
        </Button>
        <output className="w-8 text-center text-sm font-semibold tabular-nums text-foreground">
          {value}
        </output>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onChange(value + 1)}
          aria-label={`${label} 증가`}
        >
          <Plus />
        </Button>
      </div>
    </article>
  );
};
