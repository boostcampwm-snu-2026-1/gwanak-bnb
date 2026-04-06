import { useState } from "react"
import GuestCounter from "./GuestCounter"

function GuestModal({ onClose }) {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  })

  const increase = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const decrease = (type) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))
  }

  return (
    <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-xl p-6 w-80 z-10">
      <GuestCounter
        label="성인"
        description="13세 이상"
        count={guests.adults}
        onIncrease={() => increase("adults")}
        onDecrease={() => decrease("adults")}
      />
      <GuestCounter
        label="어린이"
        description="2~12세"
        count={guests.children}
        onIncrease={() => increase("children")}
        onDecrease={() => decrease("children")}
      />
      <GuestCounter
        label="유아"
        description="2세 미만"
        count={guests.infants}
        onIncrease={() => increase("infants")}
        onDecrease={() => decrease("infants")}
      />
      <button
        onClick={onClose}
        className="mt-4 w-full bg-rose-500 text-white py-2 rounded-xl"
      >
        완료
      </button>
    </div>
  )
}

export default GuestModal