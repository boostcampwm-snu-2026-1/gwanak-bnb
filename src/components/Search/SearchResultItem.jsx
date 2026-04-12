export default function SearchResultItem({ destination, isHighlighted, onSelect, query }) {
  const name = destination.name
  const idx = name.toLowerCase().indexOf((query || '').toLowerCase())

  let nameDisplay
  if (idx === -1 || !query) {
    nameDisplay = <span>{name}</span>
  } else {
    nameDisplay = (
      <>
        <span>{name.slice(0, idx)}</span>
        <span className="font-bold">{name.slice(idx, idx + query.length)}</span>
        <span>{name.slice(idx + query.length)}</span>
      </>
    )
  }

  return (
    <li
      onClick={() => onSelect(destination.name)}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${isHighlighted ? 'bg-gray-100' : ''}`}
    >
      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <div>
        <p className="text-sm text-gray-800">{nameDisplay}</p>
        <p className="text-xs text-gray-500">{destination.region}</p>
      </div>
    </li>
  )
}
