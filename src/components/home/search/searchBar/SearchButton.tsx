import { Search } from "lucide-react";
import { cn } from "../../../../utils/cn";

type SearchButtonProps = {
  isDropdownOpen: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SearchButton = ({
  isDropdownOpen,
  className,
  ...props
}: SearchButtonProps) => {
  return (
    <button
      className={cn(
        "relative h-12 bg-[#E00B41] hover:cursor-pointer",
        className,
        isDropdownOpen ? "w-18.75 rounded-3xl" : "w-12 rounded-full",
      )}
      {...props}
    >
      <Search
        size={16}
        color="white"
        strokeWidth={3}
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          isDropdownOpen ? "left-3" : "left-1/2 -translate-x-1/2",
        )}
      />
      <span
        aria-hidden={!isDropdownOpen}
        className={cn(
          "absolute top-1/2 left-8.5 -translate-y-1/2 text-base font-medium text-white",
          isDropdownOpen
            ? "opacity-100 transition-opacity delay-150 duration-150 ease-out"
            : "opacity-0 transition-none",
        )}
      >
        검색
      </span>
    </button>
  );
};
