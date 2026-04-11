import SearchLocation from "./SearchLocation/SearchLocation"
import SearchGuest from "./SearchGuest/SearchGuest"

function Searchbar() {
  return (
    <div className="relative flex items-center border rounded-full shadow-md px-4 py-2 gap-4">
      <SearchLocation />
      <SearchGuest />
      <button className="bg-rose-500 text-white rounded-full p-2">🔍</button>
    </div>
  )
}

export default Searchbar