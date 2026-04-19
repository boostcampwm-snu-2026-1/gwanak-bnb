import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/lodgings";

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async ({ location, guests }) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (guests > 0) params.append("guests", guests);

      const response = await fetch(`${API_URL}/search?${params.toString()}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      {hasSearched && <SearchResults results={results} isLoading={isLoading} />}
    </div>
  );
}

export default App;