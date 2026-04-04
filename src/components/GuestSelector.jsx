import { useState } from "react";
import GuestModal from "./GuestModal";

function GuestSelector() {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => SetIsOpen(!isOpen)}>Who</button>
      {isOpen && <GuestModal />}
    </div>
  );
}

export default GuestSelector;
