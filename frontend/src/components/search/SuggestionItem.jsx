import React from 'react';

export default function SuggestionItem({ item, index, isActive, updateSearchState }) {
  
  const handleClick = () => {
    updateSearchState({
      query: item,
      isOpen: false,
      selectedIndex: -1
    });
  };

  const handleMouseEnter = () => {updateSearchState({selectedIndex: index});};

  return (
    <li 
      className={`suggestion-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <span className="location-icon">📍</span>
      <span className="location-name">{item}</span>
    </li>
  );
}