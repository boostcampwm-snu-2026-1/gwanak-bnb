import SuggestionItem from '../SuggestionItem/SuggestionItem';
import styles from './SearchSuggestions.module.css';

function SearchSuggestions({ suggestions, highlightedIndex, onSelect }) {
  if (suggestions.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {suggestions.map((text, index) => (
          <SuggestionItem
            key={text}
            text={text}
            isHighlighted={index === highlightedIndex}
            onClick={() => onSelect(text)}
          />
        ))}
      </ul>
    </div>
  );
}

export default SearchSuggestions;
