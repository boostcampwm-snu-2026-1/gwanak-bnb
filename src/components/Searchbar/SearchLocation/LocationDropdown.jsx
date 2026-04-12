import LocationItem from "./LocationItem"
import SearchResultItem from "./SearchResultItem"

const RECOMMENDED = [
  { id: 1, name: "서울", description: "대한민국의 수도" },
  { id: 2, name: "부산", description: "아름다운 해변 도시" },
  { id: 3, name: "제주", description: "아름다운 섬" },
  { id: 4, name: "경주", description: "역사의 도시" },
  { id: 5, name: "강릉", description: "동해바다의 도시" },
]

function LocationDropdown({ keyword, selectedIndex, onSelect }) {
  const filtered = RECOMMENDED.filter((item) =>
    item.name.includes(keyword)
  )

  return (
    <div className="absolute top-12 left-0 bg-white rounded-2xl shadow-xl p-4 w-80 z-10">
      {keyword === "" ? (
        <>
          <p className="text-sm font-semibold mb-3">추천 여행지</p>
          {RECOMMENDED.map((item, index) => (
            <LocationItem
              key={item.id}
              item={item}
              isSelected={selectedIndex === index}
              onSelect={onSelect}
            />
          ))}
        </>
      ) : (
        <>
          <p className="text-sm font-semibold mb-3">추천 여행 검색어</p>
          {filtered.map((item, index) => (
            <SearchResultItem
              key={item.id}
              item={item}
              isSelected={selectedIndex === index}
              onSelect={onSelect}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default LocationDropdown