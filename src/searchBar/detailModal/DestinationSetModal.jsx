import { useState } from "react";
import styles from "../../css/SetModal.module.css";

function DestinationSetModal({ queryDestination, setDestination, setIsOpen, highlightedIndex }) {

  return (
    <div className={styles.container}>
      {queryDestination.map((item, index) => (
        <button 
        key={item.name} 
        onClick={() => setDestination(item.name)} 
        className={styles.unit}
        style={{
                backgroundColor:
                  highlightedIndex === index ? "#f0f0f0" : "transparent",
              }}
        >
          <div className={styles.title}>{item.name}</div>
          <div className={styles.desc}>{item.country}</div>
          <div className={styles.desc}>{item.description}</div>
        </button>
      ))}
    </div>
  );
}

export default DestinationSetModal;