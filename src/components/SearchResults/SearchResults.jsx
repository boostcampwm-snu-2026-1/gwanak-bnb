function SearchResults({ results }) {
  if (!results.length) {
    return (
      <div className="mt-8 rounded-3xl bg-white border border-gray-200 p-8 text-center text-gray-500">
        검색 결과가 아직 없습니다. 여행지와 인원을 선택한 뒤 검색 버튼을 눌러보세요.
      </div>
    );
  }

  return (
    <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((place) => (
        <article key={place.id} className="rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200">
          <img
            src={place.images?.[0]}
            alt={place.title}
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-rose-500 font-bold mb-2">{place.location}</div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{place.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{place.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>최대 {place.guestCapacity}명</span>
              <span>★ {place.rating.toFixed(2)} ({place.reviews})</span>
            </div>
            <div className="mt-4 text-right font-semibold text-gray-900">
              ₩{place.price.toLocaleString()}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default SearchResults;
