import './CounterRow.css';

function CounterRow({ title, desc, count, onIncrease, onDecrease }) {
  return (
    <div className="counter-row">
      <div className="text-info">
        <span className="title">{title}</span>
        <span className="desc">{desc}</span>
      </div>
      <div className="controls">
        <button onClick={onDecrease}>-</button>
        <span>{count}</span>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  )
}

export default CounterRow;