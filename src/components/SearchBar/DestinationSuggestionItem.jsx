import styles from './SearchBar.module.css'

function DestinationSuggestionItem({ destination, mode, isHighlighted, optionId, onMouseEnter, onSelect }) {
  return (
    <li>
      <button
        type="button"
        id={optionId}
        role="option"
        aria-selected={isHighlighted}
        className={`${styles.suggestionItem} ${isHighlighted ? styles.suggestionItemHighlighted : ''}`}
        onMouseEnter={onMouseEnter}
        onClick={() => onSelect(destination.title)}
      >
        <span
          className={`${styles.suggestionIcon} ${
            mode === 'recommended' ? styles[`tone${destination.tone}`] : styles.toneNeutral
          }`}
        >
          <span aria-hidden="true">{destination.icon}</span>
        </span>

        <span className={styles.suggestionText}>
          <strong className={styles.suggestionTitle}>{destination.title}</strong>
          <span className={styles.suggestionSubtitle}>{destination.subtitle}</span>
        </span>
      </button>
    </li>
  )
}

export default DestinationSuggestionItem
