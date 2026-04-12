import React from 'react';
import DestinationInput from '../search/DestinationInput';
import SearchDropdown from '../search/SearchDropdown';

function SearchBar({ 
  adults, children, infants, isModalOpen, setIsModalOpen,
  searchState, updateSearchState 
}) {
  const totalGuests = adults + children;
  
  const getDisplayText = () => {
    if (totalGuests === 0 && infants === 0) return "게스트 추가";
    let text = `게스트 ${totalGuests}명`;
    if (infants > 0) text += `, 유아 ${infants}명`;
    return text;
  };

  const handleQueryChange = (newQuery) => {
    updateSearchState({ 
      query: newQuery, 
      isOpen: true,
      selectedIndex: -1
    });
  };

  const handleNavigate = (delta) => {
    updateSearchState({selectedIndex: searchState.selectedIndex + delta});
  };

  const handleOpenDropdown = () => {
    updateSearchState({isOpen: true});
    setIsModalOpen(false);
  };

  return (
    <div className="search-bar-container">
      <div className="search-item destination-selection">
        <DestinationInput 
          query={searchState.query}
          onChangeQuery={handleQueryChange}
          onNavigate={handleNavigate}
          onOpenDropdown={handleOpenDropdown}
        />

        {searchState.isOpen && (
          <SearchDropdown 
            searchState={searchState}
            updateSearchState={updateSearchState}
          />
        )}
      </div>

      <div className="search-item traveler-selection">
        <span className="label">여행자</span>
        <button 
          className={`search-button ${isModalOpen ? 'active' : ''}`}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
            updateSearchState({isOpen: false});
          }}
        >
          {getDisplayText()}
        </button>
      </div>

      <button className="search-icon-button">
        <span className="search-icon">🔍</span>
      </button>
    </div>
  );
}

export default SearchBar;