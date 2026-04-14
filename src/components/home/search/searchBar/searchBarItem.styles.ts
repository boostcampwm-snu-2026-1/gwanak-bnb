import { cn } from "../../../../utils/cn";
import type { SearchBarItemState } from "./SearchBar";

export const searchBarItemRootClass = (itemState: SearchBarItemState) =>
  cn(
    "m-0 flex-1 basis-0 cursor-pointer rounded-4xl border-0 px-6 py-3.75 text-left",
    itemState === "selected" &&
      "rounded-4xl border-x border-[#dddddd] bg-white shadow-[0px_3px_12px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.08)]",
    itemState === "none" && "hover:bg-[#ebebeb]",
    itemState === "other" && "hover:bg-[#dddddd]",
  );

export const searchBarItemLabelClass =
  "text-[12px] font-medium leading-[16px] pb-[2px]";
export const searchBarItemContentClass =
  "text-sm text-[#6a6a6a] leading-[18px]";
