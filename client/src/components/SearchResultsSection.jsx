function AccommodationCard({ accommodation }) {
  const primaryCapacity = accommodation.guestCapacity.primary
  const infantCapacity = accommodation.guestCapacity.infant
  const petCapacity = accommodation.guestCapacity.pet
  const primaryCapacityText =
    primaryCapacity.min === primaryCapacity.max
      ? `게스트 ${primaryCapacity.max}명`
      : `게스트 ${primaryCapacity.min}~${primaryCapacity.max}명`
  const infantCapacityText =
    infantCapacity.max > 0 ? `유아 최대 ${infantCapacity.max}명` : null
  const petCapacityText =
    petCapacity.max > 0 ? `반려동물 최대 ${petCapacity.max}마리` : null
  const capacityText = [
    primaryCapacityText,
    infantCapacityText,
    petCapacityText,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
        {accommodation.imageUrls[0] ? (
          <img
            src={accommodation.imageUrls[0]}
            alt={accommodation.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-200 to-zinc-100" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-zinc-900">
              {accommodation.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              {accommodation.address.city}, {accommodation.address.country}
            </p>
          </div>

          <div className="flex-shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
            ★ {accommodation.rating.toFixed(2)}
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-500">
          {accommodation.address.detail}
        </p>
        <p className="mt-3 text-sm text-zinc-500">{capacityText}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-sm text-zinc-500">
            후기 {accommodation.reviewCount}개
          </p>
          <p className="text-base font-semibold text-zinc-900">
            ₩{accommodation.pricePerNight.toLocaleString()} / 박
          </p>
        </div>
      </div>
    </article>
  )
}

function SearchResultsSection({
  hasSearched,
  isSearching,
  errorMessage,
  results,
  meta,
}) {
  if (!hasSearched && !errorMessage) {
    return null
  }

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">검색 결과</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
            {errorMessage
              ? '검색 요청을 확인해 주세요'
              : isSearching
              ? '숙소를 찾는 중입니다'
              : `${meta.totalCount ?? results.length}개의 숙소를 찾았습니다`}
          </h2>
        </div>

        {meta.totalCount ? (
          <p className="text-sm text-zinc-500">
            페이지 {meta.page} / {meta.totalPages}
          </p>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-[24px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {isSearching ? (
        <div className="mt-5 rounded-[24px] border border-zinc-200 bg-white px-5 py-8 text-sm text-zinc-500 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
          검색 조건에 맞는 숙소를 불러오는 중입니다.
        </div>
      ) : null}

      {!isSearching && !errorMessage && results.length === 0 ? (
        <div className="mt-5 rounded-[24px] border border-dashed border-zinc-200 bg-white px-5 py-8 text-sm text-zinc-500">
          검색 조건에 맞는 숙소가 없습니다. 여행지나 인원 조건을 조금 바꿔보세요.
        </div>
      ) : null}

      {!isSearching && results.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((accommodation) => (
            <AccommodationCard
              key={accommodation._id}
              accommodation={accommodation}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default SearchResultsSection
