import DestinationList from "./DestinationList";
import styles from "./DestinationModal.module.css";

function DestinationModal({
  destinations,
  isSearching,
  highlightedIndex,
  onSelect,
}) {
  return (
    <div className={styles.modal}>
      <div className={styles.scrollArea}>
        <DestinationList
          title={isSearching ? null : "추천 여행지"}
          destinations={destinations}
          highlightedIndex={highlightedIndex}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

export default DestinationModal;
