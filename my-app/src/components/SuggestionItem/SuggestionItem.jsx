import styles from './SuggestionItem.module.css';

function SuggestionItem({ text, isHighlighted, onClick }) {
  return (
    <li
      className={`${styles.item} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={onClick}
    >
      <span className={styles.icon}>📍</span>
      <span className={styles.text}>{text}</span>
    </li>
  );
}

export default SuggestionItem;
