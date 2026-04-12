import RecommendedDestinations from './RecommendedDestinations'
import SearchResultItem from './SearchResultItem'

export default function SearchDropdown({ isOpen, query, results, allDestinations, highlightedIndex, onSelect }) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
      {!query ? (
        <RecommendedDestinations
          destinations={allDestinations}
          onSelect={onSelect}
          highlightedIndex={highlightedIndex}
        />
      ) : results.length > 0 ? (
        <ul>
          {results.map((dest, index) => (
            <SearchResultItem
              key={dest.id}
              destination={dest}
              isHighlighted={highlightedIndex === index}
              onSelect={onSelect}
              query={query}
            />
          ))}
        </ul>
      ) : (
        <div className="px-4 py-8 text-center text-sm text-gray-500">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  )
}
