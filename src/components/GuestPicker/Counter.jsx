import './Counter.css';

function Counter({ count, onIncrement, onDecrement, maxDisbaled, minDisabled }){
    return (
    <div className="counter-container">
        <button className="counter-btn" disabled={minDisabled} onClick={onDecrement} >
            <svg viewBox="0 0 32 32" className="counter-icon"><path d="M2 16h28" /></svg>
        </button>
        <span className="counter-value">{count}</span>
        <button className="counter-btn" disabled={maxDisbaled} onClick={onIncrement} >
            <svg viewBox="0 0 32 32" className="counter-icon"><path d="M2 16h28M16 2v28" /></svg>
        </button>

    </div>
    );
}
export default Counter;