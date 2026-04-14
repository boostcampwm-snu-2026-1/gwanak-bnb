import { cn } from "../../../../utils/cn";
import {
  searchBarItemContentClass,
  searchBarItemLabelClass,
  searchBarItemRootClass,
} from "./searchBarItem.styles";
import type { SearchBarItemState } from "./SearchBar";

type SearchBarInputItemProps = {
  label: string;
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
  itemState: SearchBarItemState;
  onOpen: () => void;
} & React.HTMLAttributes<HTMLLabelElement>;

export const SearchBarInputItem = ({
  label,
  placeholder,
  query,
  onQueryChange,
  itemState,
  onOpen,
  className,
  ...props
}: SearchBarInputItemProps) => {
  return (
    <label
      className={cn(searchBarItemRootClass(itemState), className)}
      {...props}
    >
      <h3 className={searchBarItemLabelClass}>{label}</h3>
      <input
        name="query"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={onOpen}
        className={cn(
          searchBarItemContentClass,
          "text-default block w-full appearance-none font-medium outline-0 placeholder:font-normal placeholder:text-[#6a6a6a] placeholder:opacity-100",
        )}
      />
    </label>
  );
};
