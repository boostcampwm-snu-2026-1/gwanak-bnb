import './GuestSelector.css';

const GUEST_TYPES = [
  { key: 'adults', label: '성인', desc: '13세 이상' },
  { key: 'children', label: '어린이', desc: '2~12세' },
  { key: 'infants', label: '유아', desc: '2세 미만' },
];

export default function GuestSelector({ guests, setGuests }) {
  const update = (key, delta) => {
    setGuests(prev => {
      const val = prev[key] + delta;
      if (val < 0) return prev;
      if (key === 'adults' && val > 16) return prev;
      if (key === 'children' && val > 5) return prev;
      if (key === 'infants' && val > 5) return prev;
      if (key !== 'adults' && delta > 0 && prev.adults === 0) {
        return { ...prev, [key]: val, adults: 1 };
      }
      return { ...prev, [key]: val };
    });
  };

  return (
    <div className="guest-selector">
      {GUEST_TYPES.map(({ key, label, desc }) => (
        <div key={key} className="guest-row">
          <div className="guest-info">
            <span className="guest-type">{label}</span>
            <span className="guest-desc">{desc}</span>
          </div>
          <div className="guest-controls">
            <button
              className="guest-btn"
              disabled={guests[key] === 0}
              onClick={() => update(key, -1)}
            >-</button>
            <span className="guest-count">{guests[key]}</span>
            <button
              className="guest-btn"
              onClick={() => update(key, 1)}
            >+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
