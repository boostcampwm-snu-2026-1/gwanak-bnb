import { recommendedDestinations } from '../../data/destinations';
import DestinationCard from '../DestinationCard/DestinationCard';
import styles from './RecommendedDestinations.module.css';

function RecommendedDestinations({ onSelect }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>추천 여행지</h3>
      <div className={styles.grid}>
        {recommendedDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            name={dest.name}
            region={dest.region}
            icon={dest.icon}
            onClick={() => onSelect(dest.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedDestinations;
