import { useState, useEffect, useRef } from "react"
import GuestModal from "./GuestModal"

function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 })
  const modalRef = useRef(null)

  const increase = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const decrease = (type) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))
  }

  const totalGuests = guests.adults + guests.children + guests.infants

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false)
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  return (
    <div className="relative flex items-center border rounded-full shadow-md px-4 py-2 gap-4" ref={modalRef}>
      <button className="text-sm font-semibold px-4 border-r">어디든지</button>
      <button className="text-sm font-semibold px-4 border-r">언제든지</button>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-sm font-semibold px-4 text-gray-400 cursor-pointer"
      >
        {totalGuests > 0 ? `여행자 ${totalGuests}명` : "여행자 추가"}
      </button>
      <button className="bg-rose-500 text-white rounded-full p-2">
        🔍
      </button>
      {isModalOpen && (
        <GuestModal
          guests={guests}
          onIncrease={increase}
          onDecrease={decrease}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default SearchBar