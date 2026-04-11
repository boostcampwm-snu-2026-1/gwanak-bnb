import { useState, useEffect, useRef } from "react"
import GuestModal from "./GuestModal"

function SearchGuest() {
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
    <div ref={modalRef} className="relative">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-sm font-semibold px-4 text-gray-400 cursor-pointer"
      >
        {totalGuests > 0 ? `여행자 ${totalGuests}명` : "여행자 추가"}
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

export default SearchGuest