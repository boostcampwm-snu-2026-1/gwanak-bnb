import type { ComponentType, SVGProps } from "react";

interface RecommendedLocationListItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  onSelect?: (title: string) => void;
}

const RecommendedLocationListItem = ({
  icon: Icon,
  title,
  subtitle,
  onSelect,
}: RecommendedLocationListItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(title)}
      className="flex w-full items-start gap-3 rounded-2xl px-2.5 py-2.5 text-left transition-colors hover:bg-background/70 focus-visible:bg-background/70 focus-visible:outline-none"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-foreground shadow-sm ring-1 ring-border/60">
        <Icon className="size-4.5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground">
          {title}
        </span>
        <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">
          {subtitle}
        </span>
      </span>
    </button>
  );
};

export default RecommendedLocationListItem;
