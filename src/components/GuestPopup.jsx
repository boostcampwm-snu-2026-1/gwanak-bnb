import "./GuestPopup.css";

export default function GuestPopup({ 
    guests,
    onIncrease, 
    onDecrease 
}) {
    const guestItems = [
    { key: "adults", label: "성인", description: "13세 이상" },
    { key: "children", label: "어린이", description: "2~12세" },
    { key: "infants", label: "유아", description: "2세 미만" },
    { key: "pets", label: "반려동물", description: "보조동물을 동반하시나요?" },
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

            <span className="guest-popup__count">{guests[item.key]}</span>

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