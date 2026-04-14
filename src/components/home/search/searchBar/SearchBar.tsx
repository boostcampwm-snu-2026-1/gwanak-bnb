import { GuestDropdown } from "../dropdown/GuestDropdown";
import { useGuestCount } from "../../../../hooks/useGuestCount";
import { useRef, useState } from "react";
import { cn } from "../../../../utils/cn";
import { DateDropdown } from "../dropdown/DateDropdown";
import { DestinationDropdown } from "../dropdown/DestinationDropdown";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { SearchBarButtonItem } from "./SearchBarButtonItem";
import { SearchBarInputItem } from "./SearchBarInputItem";
import { SearchButton } from "./SearchButton";

export type CurrentDropdownType = "destination" | "date" | "guest";
export type SearchBarItemState = "none" | "selected" | "other";

export const SearchBar = () => {
  // States setup
  const [query, setQuery] = useState("");

  const { counts, disabledStates, decreaseCount, increaseCount } =
    useGuestCount({
      adult: 0,
      child: 0,
      infant: 0,
      pet: 0,
    });

  // Dropdown setup
  const [currentDropdown, setCurrentDropdown] =
    useState<CurrentDropdownType | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isDropdownOpen = currentDropdown !== null;
  const getDropdownState = (
    dropdownType: CurrentDropdownType,
  ): SearchBarItemState => {
    if (currentDropdown === null) {
      return "none";
    }

    return dropdownType === currentDropdown ? "selected" : "other";
  };

  const closeDropdown = () => setCurrentDropdown(null);
  const toggleDropdown = (dropdownType: CurrentDropdownType) => {
    if (currentDropdown === dropdownType) {
      setCurrentDropdown(null);
    } else {
      setCurrentDropdown(dropdownType);
    }
  };

  useOutsideClick({
    ref: dropdownRef,
    callback: closeDropdown,
    isOpen: isDropdownOpen,
  });

  const renderDropdown = () => {
    if (currentDropdown === "destination") {
      return <DestinationDropdown className="absolute top-full left-0 mt-3" />;
    } else if (currentDropdown === "date") {
      return (
        <DateDropdown className="absolute top-full left-1/2 mt-3 -translate-x-1/2" />
      );
    } else if (currentDropdown === "guest") {
      return (
        <GuestDropdown
          counts={counts}
          disabledStates={disabledStates}
          decreaseCount={decreaseCount}
          increaseCount={increaseCount}
          className="absolute top-full right-0 mt-3"
        />
      );
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-16.5 w-212.5 items-stretch gap-0.5 rounded-[100px] border border-[#dddddd] bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.02),0px_8px_24px_0px_rgba(0,0,0,0.10)]",
        isDropdownOpen && "bg-[#ebebeb] shadow-none",
      )}
      ref={dropdownRef}
    >
      <SearchBarInputItem
        label="여행지"
        placeholder="여행지 검색"
        query={query}
        onQueryChange={setQuery}
        itemState={getDropdownState("destination")}
        onOpen={() => setCurrentDropdown("destination")}
        className="border-l-0"
      />
      <SearchBarButtonItem
        label="날짜"
        description="날짜 추가"
        itemState={getDropdownState("date")}
        onClick={() => toggleDropdown("date")}
      />
      <SearchBarButtonItem
        label="여행자"
        description="게스트 추가"
        itemState={getDropdownState("guest")}
        onClick={() => toggleDropdown("guest")}
        className="border-r-0"
      />
      <SearchButton
        isDropdownOpen={isDropdownOpen}
        className="absolute top-1/2 right-2 -translate-y-1/2"
      />
      {/* <Transition
        open={!!currentDropdown}
        animateOnEnter={true}
        animateOnExit={false}
      ></Transition> */}
      {renderDropdown()}
    </div>
  );
};
