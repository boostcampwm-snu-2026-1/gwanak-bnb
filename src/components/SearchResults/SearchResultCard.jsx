// 숙소 검색 결과 카드 컴포넌트

export default function SearchResultCard({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* 이미지 플레이스홀더 */}
      <div className={`h-48 bg-gradient-to-br ${item.color}`} />

      {/* 정보 영역 */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <span className="text-sm font-semibold text-gray-900 leading-snug">{item.name}</span>
          <span className="flex items-center gap-1 text-sm text-gray-700 ml-2 flex-shrink-0">
            ★ {item.rating}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-1">{item.location}</p>
        <p className="text-sm text-gray-900 mt-3">
          <span className="font-semibold">₩{item.price.toLocaleString()}</span>
          <span className="text-gray-400"> /박</span>
        </p>
      </div>
    </div>
  )
}
