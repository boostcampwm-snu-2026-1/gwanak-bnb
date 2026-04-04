import './GuestSelector.css'

function GuestRow({ label, description, count, onIncrement, onDecrement }) {
  return (
    <div className="guest-row">
      <div className="guest-info">
        <span className="guest-label">{label}</span>
        <span className="guest-description">{description}</span>
      </div>
      <div className="guest-counter">
        <button
          className="counter-button"
          onClick={onDecrement}
          disabled={count === 0}
        >
          −
        </button>
        <span className="counter-value">{count}</span>
        <button className="counter-button" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  )
}

export default GuestRow
