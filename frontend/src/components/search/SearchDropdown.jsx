import React from 'react';
import SuggestionList from './SuggestionList';

const RECOMMENDED_DESTINATIONS = ['서울', '부산', '제주도'];
const ALL_DESTINATIONS = ['서울', '부산', '제주도'];

export default function SearchDropdown({ searchState, updateSearchState }) {
  const { query, selectedIndex } = searchState;
  const cleanQuery = query.trim();
  const isQueryEmpty = cleanQuery === '';
  const filteredData = isQueryEmpty 
    ? RECOMMENDED_DESTINATIONS 
    : ALL_DESTINATIONS.filter(dest => dest.includes(cleanQuery));

  return (
    <div className="search-dropdown">
      <div className="dropdown-header">
        {isQueryEmpty ? '최근 검색어 및 추천' : '검색 결과'}
      </div>
      {filteredData.length > 0 ? (
        <SuggestionList 
          items={filteredData}
          selectedIndex={selectedIndex}
          updateSearchState={updateSearchState}
        />
      ) : (
        <div className="no-results">일치하는 검색 결과가 없습니다.</div>
      )}
    </div>
  );
}