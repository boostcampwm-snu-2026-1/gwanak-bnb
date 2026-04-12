import React, { useState } from "react";
import SuggestionItem from "./SuggestionItem";
import { LOCATION_SUGGESTIONS } from "./data/locationSuggestions";

function SelectLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const displayText = query || "Search destinations";
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSuggestions = normalizedQuery
    ? LOCATION_SUGGESTIONS.filter((item) => item.toLowerCase().includes(normalizedQuery))
    : LOCATION_SUGGESTIONS;

  return (
    <div className="location-wrapper">
      <button className="location-pop" onClick={() => setIsOpen((prev) => !prev)} type="button">
        <span className="search-field-title">Where</span>
        <span className="search-field-value">{displayText}</span>
      </button>

      {isOpen && (
        <div className="location-panel">
          <input
            className="location-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations"
          />
          <ul className="suggestion-list">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => <SuggestionItem key={item} label={item} />)
            ) : (
              <li className="suggestion-item">No destinations found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectLocation;
