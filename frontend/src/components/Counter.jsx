import React from 'react';
import '../styles/Modal.css';

function Counter({label, sublabel, count, onIncrease, onDecrease, min = 0, max = 10}) {
    return (
<div className="counter-group">
      <div className="counter-label">
        <h3>{label}</h3>
        <p>{sublabel}</p>
      </div>
      <div className="counter-controls">
        <button 
          className="counter-btn" 
          onClick={onDecrease}
          disabled={count <= min}
        >
          -
        </button>
        <span className="counter-number">{count}</span>
        <button 
          className="counter-btn" 
          onClick={onIncrease}
          disabled={count >= max}
        >
          +
        </button>
      </div>
    </div>
    );
}

export default Counter;