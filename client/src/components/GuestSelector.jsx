import { useState, useEffect } from "react";
import GuestModal from "./GuestModal";
import styles from "./GuestSelector.module.css";

function GuestSelector({ onGuestsChange, closeSignal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  useEffect(() => {
    if (closeSignal) setIsOpen(false);
  }, [closeSignal]);

  const totalGuests = adults + children + infants;

  const handleAdultsChange = (value) => {
    const newAdults = Math.max(0, value);
    setAdults(newAdults);
    if (onGuestsChange) onGuestsChange(newAdults + children + infants);
  };

  const handleChildrenChange = (value) => {
    const newChildren = Math.max(0, value);
    setChildren(newChildren);
    if (onGuestsChange) onGuestsChange(adults + newChildren + infants);
  };

  const handleInfantsChange = (value) => {
    const newInfants = Math.max(0, value);
    setInfants(newInfants);
    if (onGuestsChange) onGuestsChange(adults + children + newInfants);
  };

  return (
    <div className={styles.container}>
      <div className={styles.field} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.fieldLabel}>Guests</span>
        <span className={styles.fieldValue}>
          {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
        </span>
      </div>
      {isOpen && (
        <GuestModal
          adults={adults}
          setAdults={handleAdultsChange}
          children={children}
          setChildren={handleChildrenChange}
          infants={infants}
          setInfants={handleInfantsChange}
        />
      )}
    </div>
  );
}

export default GuestSelector;
