import './App.css'
import React, { useState } from "react";

function App() {
  const [guests, setGuests] = useState({
    adult: 0,
    child: 0,
    baby: 0
  });

  const changeGuest = (type, diff) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + diff),
    }));
  };

  const guestTypes = ["adult", "child", "baby"];
  
  return (
    <div>
      
      <p className="total-guest">Total Guest: {guests["adult"]+guests["child"]+guests["baby"]}</p>

      {guestTypes.map((type) => (
        <div key={type} className="guest-row">
          <button className="guest-btn" onClick={() => changeGuest(type, -1)} disabled={guests[type] === 0}>-</button>
          <p className="guest-label">{type}: {guests[type]}</p>
          <button className="guest-btn" onClick={() => changeGuest(type, 1)}>+</button>
        </div>
      ))}
    </div>
  )
}

export default App
