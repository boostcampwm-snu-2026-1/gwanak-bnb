import { useState } from "react"
import GuestModal from "./GuestModal"

function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative flex items-center border rounded-full shadow-md px-4 py-2 gap-4">
      <button className="text-sm font-semibold px-4 border-r">어디든지</button>
      <button className="text-sm font-semibold px-4 border-r">언제든지</button>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-sm font-semibold px-4 text-gray-400"
      >
        여행자 추가
      </button>
      <button className="bg-rose-500 text-white rounded-full p-2">
        🔍
      </button>
      {isModalOpen && (
        <GuestModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

export default SearchBar