import RecommendedDestinations from '../RecommendedDestinations/RecommendedDestinations';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import overlayStyles from '../../styles/overlay.module.css';

function LocationSearch({ isOpen, query, suggestions, highlightedIndex, onSelect, onClose }) {
  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      <div className={overlayStyles.modal} onClick={(e) => e.stopPropagation()}>
        {hasQuery ? (
          <SearchSuggestions
            suggestions={suggestions}
            highlightedIndex={highlightedIndex}
            onSelect={onSelect}
          />
        ) : (
          <RecommendedDestinations onSelect={onSelect} />
        )}
      </div>
    </div>
  );
}

export default LocationSearch;
