import "./GuestPopup.css";

export default function GuestPopup({ 
    adults, 
    children, 
    infants, 
    pets, 
    onIncrease, 
    onDecrease 
}) {
    const guestItems = [
    { key: "adults", label: "성인", description: "13세 이상", count: adults },
    { key: "children", label: "어린이", description: "2~12세", count: children },
    { key: "infants", label: "유아", description: "2세 미만", count: infants },
    { key: "pets", label: "반려동물", description: "보조동물을 동반하시나요?", count: pets },
  ];

  return (<div className="guest-popup">
      {guestItems.map((item) => (
        <div className="guest-popup__row" key={item.key}>
          <div className="guest-popup__info">
            <p className="guest-popup__label">{item.label}</p>
            <p className="guest-popup__description">{item.description}</p>
          </div>

          <div className="guest-popup__controls">
            <button
              type="button"
              className="guest-popup__button"
              onClick={() => onDecrease(item.key)}
              disabled={item.count === 0}
            >
              -
            </button>

            <span className="guest-popup__count">{item.count}</span>

            <button
              type="button"
              className="guest-popup__button"
              onClick={() => onIncrease(item.key)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}