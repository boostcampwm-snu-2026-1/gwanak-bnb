function GuestRow({ title, description, count, onIncrease, onDecrease, isMin, isMax }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onDecrease}
          disabled={isMin}
          className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xl transition-all
            ${isMin ? 'opacity-20 cursor-not-allowed' : 'hover:border-black active:scale-90'}`}
        >
          -
        </button>

        <span className="w-6 text-center font-medium">{count}</span>

        <button 
          onClick={onIncrease} 
          disabled={isMax}
          className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xl transition-all
            ${isMax ? 'opacity-20 cursor-not-allowed' : 'hover:border-black active:scale-90'}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default GuestRow;