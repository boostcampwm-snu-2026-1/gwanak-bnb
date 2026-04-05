import { useState } from "react";
import GuestModal from "./GuestModal";
import styles from "./GuestSelector.module.css";

function GuestSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalGuests = adults + children + infants;

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
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
        />
      )}
    </div>
  );
}

export default GuestSelector;
