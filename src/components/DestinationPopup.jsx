import './DestinationPopup.css'

export default function DestinationPopup({
  items,
  query,
  highlightedIndex,
  isLoading,
  error,
  onSelect,
}) {
  const title = query.trim() === '' ? '추천 여행지' : '검색 결과'

  return (
    <div className="destination-popup">
      <p className="destination-popup__title">{title}</p>

      {isLoading && (
        <p className="destination-popup__message">불러오는 중...</p>
      )}

      {error && (
        <p className="destination-popup__message">오류가 발생했습니다.</p>
      )}

      {!isLoading && !error && items.length === 0 && (
        <p className="destination-popup__message">검색 결과가 없습니다.</p>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="destination-popup__list">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`destination-popup__item ${
                highlightedIndex === index ? 'destination-popup__item--active' : ''
              }`}
              onClick={() => onSelect(item)}
            >
              <div className="destination-popup__icon">📍</div>

              <div className="destination-popup__text">
                <p className="destination-popup__label">{item.label}</p>
                <p className="destination-popup__description">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}