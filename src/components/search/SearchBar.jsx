import React from "react";
import SelectGuest from "./SelectGuest";
import SelectLocation from "./SelectLocation";

function SearchBar() {
  return (
    <div className="searchbar-wrapper">
      <SelectLocation />
      <SelectGuest />
    </div>
  );
}

export default SearchBar;
