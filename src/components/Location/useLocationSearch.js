import { useState, useEffect } from 'react';

function useLocationSearch(query) {
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

    return { results, loading };
}

export default useLocationSearch;
