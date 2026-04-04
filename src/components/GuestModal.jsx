import { useState } from "react";
import styles from "./GuestModal.module.css";
import GuestCounter from "./GuestCounter";

function GuestModal() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  return (
    <div className={styles.modal}>
      <GuestCounter
        label="Adults"
        description="Ages 13 or above"
        count={adults}
        onChange={setAdults}
      />
      <GuestCounter
        label="Children"
        description="Ages 2 - 12"
        count={children}
        onChange={setChildren}
      />
      <GuestCounter
        label="Infants"
        description="Under 2"
        count={infants}
        onChange={setInfants}
      />
      <GuestCounter
        label="Pets"
        description="Bringing a service animal?"
        count={pets}
        onChange={setPets}
      />
    </div>
  );
}

export default GuestModal;
