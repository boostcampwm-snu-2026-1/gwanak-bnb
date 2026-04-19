import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultRow from "./createResult";
import './searchResult.css'

function SearchResult() {
    const [searchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const query = searchParams.toString();
            const response = await fetch(`http://localhost:3000/api/search?${query}`);
            const data = await response.json();
            setRooms(data);
        };
        fetchRooms();
    }, [searchParams]);

    return (
        <div className="search-result-container">
            <h3>검색 결과: {rooms.length}건</h3>
            <div className="room-list">
                {rooms.map(room => (
                    <SearchResultRow key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
}

export default SearchResult;