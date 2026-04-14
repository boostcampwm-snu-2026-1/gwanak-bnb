import React from "react";
import { cn } from "../../../../utils/cn";

import type { SearchBarItemState } from "./SearchBar";
import {
  searchBarItemContentClass,
  searchBarItemLabelClass,
  searchBarItemRootClass,
} from "./searchBarItem.styles";

type SearchBarButtonItemProps = {
  label: string;
  description: string;
  itemState: SearchBarItemState;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SearchBarButtonItem = ({
  label,
  description,
  itemState,
  className,
  ...props
}: SearchBarButtonItemProps) => {
  return (
    <button
      className={cn(
        "appearance-none",
        searchBarItemRootClass(itemState),
        className,
      )}
      {...props}
    >
      <h3 className={searchBarItemLabelClass}>{label}</h3>
      <p className={searchBarItemContentClass}>{description}</p>
    </button>
  );
};
