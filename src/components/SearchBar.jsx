import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-text">
        <span className="search-title">여행자</span>
        <span className="search-placeholder">게스트 추가</span>
      </div>
      <button className="search-button">검색</button>
    </div>
  );
}

export default SearchBar;
