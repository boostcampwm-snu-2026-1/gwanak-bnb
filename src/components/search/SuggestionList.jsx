import styles from "./SuggestionList.module.css";

function SuggestionList({
  suggestions,
  activeIndex,
  listId,
  optionRefs,
  query,
  onHighlight,
  onSelect,
}) {
  if (suggestions.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={styles.heading}>추천 여행 검색어</p>
        <p className={styles.emptyMessage}>
          "{query}"와 관련된 추천 여행지를 찾지 못했어요.
        </p>
      </div>
    );
  }

  const heading = query
    ? `"${query}"와 관련된 추천 여행 검색어`
    : "추천 여행지";

  return (
    <div className={styles.panel}>
      <p className={styles.heading}>{heading}</p>
      <ul id={listId} className={styles.list} role="listbox">
        {suggestions.map((suggestion, index) => (
          <li key={suggestion.id} role="presentation">
            <button
              id={`${listId}-option-${suggestion.id}`}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              className={`${styles.item} ${
                activeIndex === index ? styles.itemActive : ""
              }`}
              onMouseEnter={() => onHighlight(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelect(index);
              }}
            >
              <span className={styles.icon} aria-hidden="true">
                ↗
              </span>

              <span className={styles.textGroup}>
                <strong className={styles.label}>{suggestion.label}</strong>
                <span className={styles.description}>
                  {suggestion.region} · {suggestion.description}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionList;
