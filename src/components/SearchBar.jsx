import './SearchBar.css'

export default function SearchBar() {
  return <section className="search-bar">
    <div className="search-bar__section">
        <p className="search-bar__label">여행지</p>
        <p className="search-bar__value">여행지 검색</p>
    </div>

    <div className="search-bar__divider" /> 
    
    <div className="search-bar__section">
        <p className="search-bar__label">날짜</p>
        <p className="search-bar__value">날짜 추가</p>
    </div>

    <div className="search-bar__divider" />

    <div className="search-bar__section search-bar__section--guest">
        <div className="search-bar__text">
            <p className="search-bar__label">여행자</p>
            <p className="search-bar__value">게스트 추가</p>
        </div>
        <button type="button" className="search-bar__button" aria-label="검색">
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        </button>
    </div>
  </section>
}