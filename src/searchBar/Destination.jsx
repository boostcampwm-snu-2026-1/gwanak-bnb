import { useState, useEffect } from "react";

function Destination ({ setQueryDestination, destination, setIsOpen }) {

  const [query, setQuery] = useState("");

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setQueryDestination([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/destinations/autocomplete?q=${encodeURIComponent(trimmed)}`
        );

        if (!res.ok) {
          throw new Error("검색 요청 실패");
        }

        const data = await res.json();
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
      </div>
  )
}

export default Destination