export default function SearchInput({ value, onChange, onFocus, onKeyDown, inputRef, placeholder = '여행지 검색' }) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400 font-medium"
      />
    </div>
  )
}
