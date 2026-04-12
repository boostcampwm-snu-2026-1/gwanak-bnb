import styles from './SearchBar.module.css'

function DestinationSuggestionItem({ destination, mode, onSelect }) {
  return (
    <li>
      <button type="button" className={styles.suggestionItem} onClick={() => onSelect(destination.title)}>
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
