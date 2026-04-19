import SearchBar from '../Search/SearchBar'

export default function Header({ onGuestClick, guestCount = 0, onSearch }) {
  const guestLabel = guestCount > 0 ? `게스트 ${guestCount}명` : '여행자 추가'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow divide-x divide-gray-300 w-full max-w-2xl">
            <div className="px-6 py-3 flex-1 rounded-l-full hover:bg-gray-50 cursor-text min-w-0">
              <SearchBar onSearch={onSearch} guestCount={guestCount} />
            </div>
            <button className="px-6 py-3 text-sm text-gray-500 hover:bg-gray-50 text-left whitespace-nowrap">
              날짜 추가
            </button>
            <button
              onClick={onGuestClick}
              className="px-6 py-3 text-sm hover:bg-gray-50 rounded-r-full text-left flex items-center gap-3 whitespace-nowrap"
            >
              <span className={guestCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}>
                {guestLabel}
              </span>
              <span className="bg-[#FF385C] text-white rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
