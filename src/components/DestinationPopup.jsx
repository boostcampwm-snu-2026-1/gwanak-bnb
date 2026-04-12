import './DestinationPopup.css'

export default function DestinationPopup({
  items,
  query,
  activeIndex,
  isLoading,
  error,
  onSelect,
  onItemHover,
  onListLeave,
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
        <div className="destination-popup__list" onMouseLeave={onListLeave}>
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`destination-popup__item ${
                activeIndex === index ? 'destination-popup__item--active' : ''
              }`}
              onMouseEnter={() => onItemHover(index)}
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