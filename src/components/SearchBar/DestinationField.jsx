import { useRef } from 'react'
import styles from './SearchBar.module.css'

function DestinationField({
  isActive,
  value,
  activeOptionId,
  onActivate,
  onChange,
  onClear,
  onKeyDown,
}) {
  const inputRef = useRef(null)

  const handleContainerClick = () => {
    onActivate()
    inputRef.current?.focus()
  }

  return (
    <div
      className={`${styles.field} ${isActive ? styles.destinationFieldActive : ''}`}
      onClick={handleContainerClick}
    >
      <span className={styles.label}>여행지</span>
      <div className={styles.destinationInputRow}>
        <input
          ref={inputRef}
          className={styles.destinationInput}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onActivate}
          placeholder="여행지 검색"
          aria-label="여행지 검색어 입력"
          role="combobox"
          aria-expanded={isActive}
          aria-controls="destination-dropdown-list"
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
        />
        {value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={(event) => {
              event.stopPropagation()
              onClear()
              inputRef.current?.focus()
            }}
            aria-label="여행지 입력 초기화"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default DestinationField
