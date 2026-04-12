function LocationItem({ item, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(item.name)}
      className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-lg">
        🗺️
      </div>
      <div>
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-gray-400">{item.description}</p>
      </div>
    </div>
  )
}

export default LocationItem