import React, { useRef, useEffect } from 'react';
import DestinationInput from '../search/DestinationInput';
import SearchDropdown from '../search/SearchDropdown';
import TravelerModal from '../traveler/TravelerModal';
import '../../styles/Search.css';

function SearchBar({ 
  adults, children, infants, 
  setAdults, setChildren, setInfants,
  isModalOpen, setIsModalOpen,
  searchState, updateSearchState,
  onSearch
}) {
  const searchBarRef = useRef(null);
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
    const cleanQuery = searchState.query.trim();
    const isQueryEmpty = cleanQuery === '';
    const RECOMMENDED_DESTINATIONS = ['서울', '부산', '제주도'];
    const ALL_DESTINATIONS = ['서울', '부산', '제주도'];
    
    const filteredData = isQueryEmpty 
      ? RECOMMENDED_DESTINATIONS 
      : ALL_DESTINATIONS.filter(dest => dest.includes(cleanQuery));

    const maxIndex = filteredData.length;
    if (maxIndex === 0) return;

    updateSearchState(prev => {
      let nextIndex = (prev.selectedIndex + delta + maxIndex) % maxIndex;
      return { selectedIndex: nextIndex };
    });
  };

  const handleOpenDropdown = () => {
    updateSearchState({isOpen: true});
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        updateSearchState({isOpen: false});
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {document.removeEventListener('mousedown', handleClickOutside);};
  }, [updateSearchState, setIsModalOpen]);

  return (
    <div className="search-bar-container" ref={searchBarRef}>
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

        {isModalOpen && (
          <TravelerModal
            adults={adults} setAdults={setAdults}
            children={children} setChildren={setChildren}
            infants={infants} setInfants={setInfants}
          />
        )}
      </div>

      <button className="search-icon-button" onClick={onSearch}>
        <span className="search-icon">🔍</span>
      </button>
    </div>
  );
}

export default SearchBar;