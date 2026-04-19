// 루트 컴포넌트
// SearchBar에서 검색 요청을 받아 API를 호출하고 결과를 렌더링한다

import { useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResultList from './components/SearchResults/SearchResultList'
import { searchAccommodations } from './api/search'

function App() {
  // null = 검색 전, 배열 = 검색 완료 (빈 배열 포함)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async ({ destination, guests }) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await searchAccommodations({ destination, guests })
      setResults(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <SearchBar onSearch={handleSearch} />
      </div>
      {(isLoading || results !== null) && (
        <SearchResultList results={results ?? []} isLoading={isLoading} error={error} />
      )}
    </div>
  )
}

export default App
