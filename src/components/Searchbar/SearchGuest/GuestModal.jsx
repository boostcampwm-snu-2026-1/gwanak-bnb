import GuestCounter from "./GuestCounter"

function GuestModal({ guests, onIncrease, onDecrease, onClose }) {
  return (
    <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-xl p-6 w-80 z-10">
      <GuestCounter
        label="성인"
        description="13세 이상"
        count={guests.adults}
        onIncrease={() => onIncrease("adults")}
        onDecrease={() => onDecrease("adults")}
      />
      <GuestCounter
        label="어린이"
        description="2~12세"
        count={guests.children}
        onIncrease={() => onIncrease("children")}
        onDecrease={() => onDecrease("children")}
      />
      <GuestCounter
        label="유아"
        description="2세 미만"
        count={guests.infants}
        onIncrease={() => onIncrease("infants")}
        onDecrease={() => onDecrease("infants")}
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