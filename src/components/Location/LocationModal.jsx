import { useState, useEffect } from 'react';
import LocationRow from './LocationRow';
import './LocationModal.css';

function LocationModal({ query }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const debounce = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/kakao/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=7`
                );
                const data = await res.json();
                setResults(data.documents ?? []);
            } catch (e) {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className='location-modal'>
            <span className='location-modal-title'>
                {query ? '검색 결과' : '여행지를 입력해 주세요'}
            </span>

            {loading && (
                <span className='location-modal-empty'>검색 중...</span>
            )}

            {!loading && query && results.length === 0 && (
                <span className='location-modal-empty'>검색 결과가 없습니다.</span>
            )}

            {!loading && results.map((loc) => (
                <LocationRow
                    key={loc.id}
                    name={loc.place_name}
                    description={loc.address_name}
                />
            ))}
        </div>
    );
}

export default LocationModal;
