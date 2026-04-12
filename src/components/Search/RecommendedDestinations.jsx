export default function RecommendedDestinations({ destinations, onSelect, highlightedIndex }) {
  return (
    <div>
      <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">추천 여행지</p>
      <ul>
        {destinations.map((dest, index) => (
          <li
            key={dest.id}
            onClick={() => onSelect(dest.name)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${highlightedIndex === index ? 'bg-gray-100' : ''}`}
          >
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">{dest.name}</p>
              <p className="text-xs text-gray-500">{dest.region}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
