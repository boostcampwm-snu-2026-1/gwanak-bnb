function GuestCounter({ label, description, count, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={count === 0}
          className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          -
        </button>
        <span>{count}</span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default GuestCounter