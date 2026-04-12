import styles from './SearchBar.module.css'

function DestinationSuggestionItem({ destination }) {
  return (
    <li className={styles.suggestionItem}>
      <span className={`${styles.suggestionIcon} ${styles[`tone${destination.tone}`]}`}>
        <span aria-hidden="true">{destination.icon}</span>
      </span>

      <span className={styles.suggestionText}>
        <strong className={styles.suggestionTitle}>{destination.title}</strong>
        <span className={styles.suggestionSubtitle}>{destination.subtitle}</span>
      </span>
    </li>
  )
}

export default DestinationSuggestionItem
