import React from 'react';

export default function DestinationInput({ 
  query, 
  onChangeQuery, 
  onNavigate, 
  onOpenDropdown 
}) {
  
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigate(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigate(-1);
    }
  };

  return (
    <div className="destination-input-wrapper" onClick={onOpenDropdown}>
      <label htmlFor="destination" className="input-label">여행지</label>
      <input
        id="destination"
        type="text"
        placeholder="어디로 여행가시나요?"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
    </div>
  );
}