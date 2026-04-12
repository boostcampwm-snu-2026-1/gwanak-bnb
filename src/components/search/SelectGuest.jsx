import React, { useState } from "react";

function GuestRow({ type, count, onChange }) {
  return (
    <div className="guest-row">
      <p className="guest-label">{type}</p>
      <div className="guest-controls">
        <button
          className="guest-btn"
          onClick={() => onChange(type, -1)}
          disabled={count === 0}
          type="button"
        >
          -
        </button>
        <span className="guest-count">{count}</span>
        <button className="guest-btn" onClick={() => onChange(type, 1)} type="button">
          +
        </button>
      </div>
    </div>
  );
}

function SelectGuest() {
  const [guests, setGuests] = useState({
    adult: 0,
    child: 0,
    baby: 0,
  });
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const changeGuest = (type, diff) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + diff),
    }));
  };

  const guestTypes = ["adult", "child", "baby"];
  const total = guests.adult + guests.child + guests.baby;
  const triggerText = total === 0 ? "Select guest" : `Total Guest: ${total}`;

  return (
    <div className="guest-wrapper">
      <button className="guest-pop" onClick={() => setIsGuestOpen((prev) => !prev)} type="button">
        {triggerText}
      </button>
      {isGuestOpen && (
        <div className="guest-panel">
          {guestTypes.map((type) => (
            <GuestRow key={type} type={type} count={guests[type]} onChange={changeGuest} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectGuest;
