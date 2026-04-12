import React from "react";

function SuggestionItem({ label, isActive = false }) {
  return (
    <li className={`suggestion-item ${isActive ? "active" : ""}`}>
      {label}
    </li>
  );
}

export default SuggestionItem;
