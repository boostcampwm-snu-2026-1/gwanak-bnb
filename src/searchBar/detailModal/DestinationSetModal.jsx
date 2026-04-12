import styles from "../../css/SetModal.module.css";

function DestinationSetModal({ queryDestination, setDestination }) {
  return (
    <div className={styles.container}>
      {queryDestination.map((item) => (
        <button key={item.name} onClick={() => setDestination(item.name)} className={styles.unit}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.desc}>{item.country}</div>
          <div className={styles.desc}>{item.description}</div>
        </button>
      ))}
    </div>
  );
}

export default DestinationSetModal;