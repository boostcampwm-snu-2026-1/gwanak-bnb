import './GuestCounter.css';

function GuestCounter({ label, description, count, onIncrease, onDecrease }) {
  return (
    <div className="guest-counter">
      <div className="guest-info">
        <span className="guest-label">{label}</span>
        <span className="guest-description">{description}</span>
      </div>
      <div className="guest-controls">
        <button onClick={onDecrease} disabled={count === 0}>−</button>
        <span className="guest-count">{count}</span>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
}

export default GuestCounter;
