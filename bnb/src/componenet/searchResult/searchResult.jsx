import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchResult() {
    const [searchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const query = searchParams.toString();
            const response = await fetch(`http://localhost:3000/api/search?${query}`);
            setRooms(data);
        };
        fetchRooms();
    }, [searchParams]);

    return (
        <div>
            <h2>검색 결과: {rooms.length}건</h2>
            {rooms.map(room => (
                <div key={room.id}>
                    <h4>{room.title}</h4>
                    <p>{room.price}원</p>
                </div>
            ))}
        </div>
    );
}

export default SearchResult;