import './SearchResults.css';

function SearchResults({ results, loading }) {
    if (loading) return <div className='search-results-empty'>검색 중...</div>;
    if (!results) return null;
    if (results.length === 0) return <div className='search-results-empty'>검색 결과가 없습니다.</div>;

    return (
        <div className='search-results'>
            {results.map((item) => (
                <div key={item._id} className='result-card'>
                    <img
                        className='result-card-img'
                        src={item.images[0]}
                        alt={item.name}
                    />
                    <div className='result-card-info'>
                        <div className='result-card-location'>{item.location} · 최대 {item.maxGuests}인</div>
                        <div className='result-card-name'>{item.name}</div>
                        <div className='result-card-address'>{item.address}</div>
                        <div className='result-card-footer'>
                            <span className='result-card-price'>₩{item.pricePerNight.toLocaleString()} / 박</span>
                            <span className='result-card-rating'>★ {item.rating} ({item.reviewCount})</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
