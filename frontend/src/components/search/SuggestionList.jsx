import React from 'react';
import SuggestionItem from './SuggestionItem';

export default function SuggestionList({ items, selectedIndex, updateSearchState }) {
  return (
    <ul className="suggestion-list">
      {items.map((item, index) => (
        <SuggestionItem
          key={index}
          item={item}
          index={index}
          isActive={index === selectedIndex}
          updateSearchState={updateSearchState}
        />
      ))}
    </ul>
  );
}