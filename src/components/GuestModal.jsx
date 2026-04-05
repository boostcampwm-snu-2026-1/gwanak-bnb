import GuestCounter from "./GuestCounter";
import styles from "./GuestModal.module.css";

function GuestModal({
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
}) {
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
    </div>
  );
}

export default GuestModal;
