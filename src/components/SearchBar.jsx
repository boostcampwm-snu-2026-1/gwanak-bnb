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
        <p className="search-bar__value">날짜 선택</p>
    </div>

    <div className="search-bar__divider" />

    <div className="search-bar__section search-bar__section--guest">
        <p className="search-bar__label">여행자</p>
        <p className="search-bar__value">게스트 추가</p>
    </div>
  </section>
}