export default function GuestCounter({ label, description, count, onIncrease, onDecrease, extra }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-200 last:border-b-0">
      <div>
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        <p className="text-gray-500 text-sm">{description}</p>
        {extra && (
          <a href="#" className="text-gray-700 text-sm underline mt-0.5 block">
            {extra}
          </a>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={count === 0}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-700 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">−</span>
        </button>
        <span className="w-5 text-center text-sm font-medium text-gray-900">{count}</span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-700 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
        </button>
      </div>
    </div>
  )
}
