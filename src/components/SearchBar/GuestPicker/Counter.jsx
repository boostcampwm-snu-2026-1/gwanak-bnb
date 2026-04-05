import './Counter.css';

function Counter(count, onIncrement, onDecrement, maxDisbaled, minDisabled){
    return (
    <div className="counter-container">
        <button className="counter-btn" disabled={minDisabled} onClick={onDecrement} ></button>
        <span className="counter-value">{count}</span>
        <button className="counter-btn" disabled={maxDisbaled} onClick={onIncrement} ></button>

    </div>
    );
}
export default Counter;