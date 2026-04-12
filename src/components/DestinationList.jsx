import DestinationItem from "./DestinationItem";
import styles from "./DestinationList.module.css";

function DestinationList({ title, destinations, highlightedIndex, onSelect }) {
  if (destinations.length === 0) {
    return <div className={styles.empty}>검색 결과가 없습니다</div>;
  }

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ul className={styles.list}>
        {destinations.map((destination, index) => (
          <DestinationItem
            key={destination.id}
            destination={destination}
            isHighlighted={index === highlightedIndex}
            onClick={() => onSelect(destination)}
          />
        ))}
      </ul>
    </div>
  );
}

export default DestinationList;
