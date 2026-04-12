import { RECOMMENDED, ALL_DESTINATIONS } from "../data/destinations";
import DestinationList from "./DestinationList";
import styles from "./DestinationModal.module.css";

function DestinationModal({ query, highlightedIndex, onSelect }) {
  const isSearching = query.trim().length > 0;

  const destinations = isSearching
    ? ALL_DESTINATIONS.filter((d) => d.name.includes(query.trim()))
    : RECOMMENDED;

  return (
    <div className={styles.modal}>
      <DestinationList
        title={isSearching ? null : "추천 여행지"}
        destinations={destinations}
        highlightedIndex={highlightedIndex}
        onSelect={onSelect}
      />
    </div>
  );
}

export default DestinationModal;
