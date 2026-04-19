import { useState, useEffect } from "react";
import { fetchDestinations } from "../api/destination";

function Destination ({ destination, setQueryDestination, setIsOpen }) {

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await fetchDestinations(query);
        setQueryDestination(data);

      } catch (err) {
        console.error(err);
        setQueryDestination([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);


  return(
      <div onClick={() => setIsOpen(prev => !prev)}>
          <div>여행지</div>
          <input 
            type="text"
            placeholder="여행지를 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading && <div>검색 중...</div>}
      </div>
  )
}

export default Destination