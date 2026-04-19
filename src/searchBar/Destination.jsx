import { useState, useEffect } from "react";
import { fetchDestinationSuggestions } from "../api/destination";

function Destination ({ destination, setDestination, queryDestination, setQueryDestination, setIsOpen, highlightedIndex, setHighlightedIndex }) {

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await fetchDestinationSuggestions(query);
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

  useEffect(() => {
    if (destination) {
      setQuery(destination);
    }
  }, [destination]);

  const handleKeyDown = (e) => {
    if (!queryDestination.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        Math.min(prev + 1, queryDestination.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      setDestination(queryDestination[highlightedIndex].name);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return(
      <div onClick={() => setIsOpen(true)}>
          <div>여행지</div>
          <input 
            type="text"
            placeholder="여행지를 입력하세요"
            value={destination ? destination : query}
            onChange={
              (e) => {
                setQuery(e.target.value);
                setDestination("");
                setHighlightedIndex(-1);
                setIsOpen(true);
              }}
            onKeyDown={handleKeyDown}
          />
      </div>
  )
}

export default Destination