import { useState } from "react";
import GuestModal from "./GuestModal";
import styles from "./GuestSelector.module.css";

function GuestSelector() {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.field} onClick={() => SetIsOpen(!isOpen)}>
        <span className={styles.fieldLabel}>Guests</span>
        <span className={styles.fieldValue}>Add guests</span>
      </div>
      {isOpen && <GuestModal />}
    </div>
  );
}

export default GuestSelector;
