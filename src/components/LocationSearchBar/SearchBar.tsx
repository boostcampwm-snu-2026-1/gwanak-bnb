import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SearchBarProps extends React.ComponentProps<"label"> {
  inputSlot?: ReactNode;
}

const SearchBar = forwardRef<HTMLLabelElement, SearchBarProps>(
  ({ className, inputSlot, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor="location-search-input"
        className={cn(
          "flex w-full max-w-2xl items-center gap-3 rounded-full border border-border/70 bg-background px-7 py-3 shadow-[0_18px_45px_-26px_rgba(15,23,42,0.35)] transition-colors hover:border-foreground/15",
          className
        )}
        {...props}
      >
        <div className="min-w-0 flex-1 text-left">
          <span className="mb-1 block text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Location
          </span>
          {inputSlot ?? (
            <input
              id="location-search-input"
              type="text"
              placeholder="여행할 지역이나 도시를 검색해보세요"
              className="w-full border-0 bg-transparent p-0 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          )}
        </div>
      </label>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
