// 검색 결과 목록 컴포넌트
// 로딩 / 결과 없음 / 결과 있음 세 가지 상태를 렌더링한다

import SearchResultCard from './SearchResultCard'

export default function SearchResultList({ results, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mt-10 flex justify-center">
        <p className="text-gray-400 text-sm">검색 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mt-10 flex justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-5xl mt-10 flex justify-center">
        <p className="text-gray-400 text-sm">조건에 맞는 숙소가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mt-10">
      <p className="text-sm text-gray-500 mb-4">숙소 {results.length}개</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map(item => (
          <SearchResultCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
