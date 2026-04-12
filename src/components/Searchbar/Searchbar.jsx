import SearchLocation from "./SearchLocation/SearchLocation"
import SearchGuest from "./SearchGuest/SearchGuest"

function Searchbar() {
  return (
    <div className="relative flex items-center border rounded-full shadow-md px-2 py-2">
      <SearchLocation />
      <div className="w-px h-8 bg-gray-300 mx-2" />
      <button className="flex flex-col px-6 py-2 rounded-full hover:bg-gray-100 text-left">
        <span className="text-xs font-semibold">날짜</span>
        <span className="text-sm text-gray-400">날짜 추가</span>
      </button>
      <div className="w-px h-8 bg-gray-300 mx-2" />
      <SearchGuest />
      <button className="bg-rose-500 text-white rounded-full p-3 ml-2">🔍</button>
    </div>
  )
}

export default Searchbar