import { useState } from "react";
import GuestModal from "./GuestModal";
import styles from "./GuestSelector.module.css";

function GuestSelector() {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => SetIsOpen(!isOpen)}>Who</button>
      {isOpen && <GuestModal />}
    </div>
  );
}

export default GuestSelector;
