export default function AccommodationCard({ name, address, capacity, price, rating, reviewCount, imageUrl, accommodationType, isFeatured }) {
  const ratingScore = typeof rating === 'object' ? rating?.overall : rating;
  const guestCount = typeof capacity === 'object' ? capacity?.guests : capacity;
  const bedroomCount = capacity?.bedrooms;
  const bedCount = capacity?.beds;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden relative">
      {isFeatured && (
        <span className="absolute top-3 left-3 z-10 bg-[#FF385C] text-white text-xs font-semibold px-2 py-1 rounded-full">
          돋보이는 숙소
        </span>
      )}
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">이미지 없음</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          {accommodationType && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{accommodationType}</span>
          )}
          {address?.sigungu && (
            <span className="text-xs text-gray-400">{address.sigungu}</span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{name}</h3>
        {address && (
          <p className="text-sm text-gray-500 mb-1">{address.sido}</p>
        )}
        <div className="text-xs text-gray-400 mb-2">
          {guestCount != null && <span>👥 최대 {guestCount}명</span>}
          {bedroomCount != null && <span> · 🛏 침실 {bedroomCount}개</span>}
          {bedCount != null && <span> · 침대 {bedCount}개</span>}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            ★ {typeof ratingScore === 'number' ? ratingScore.toFixed(1) : '–'}
            {reviewCount != null && <span className="text-gray-400 ml-1">({reviewCount})</span>}
          </span>
          <span className="font-semibold text-gray-900">₩{Number(price).toLocaleString()} / 박</span>
        </div>
      </div>
    </div>
  );
}
