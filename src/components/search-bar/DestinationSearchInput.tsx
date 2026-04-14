import type { KeyboardEventHandler, RefObject } from 'react'

export type DestinationSearchInputProps = {
  id: string
  listboxId: string
  value: string
  expanded: boolean
  activeOptionId: string | undefined
  inputRef: RefObject<HTMLInputElement | null>
  onChange: (value: string) => void
  onKeyDown: KeyboardEventHandler<HTMLInputElement>
  variant?: 'bar' | 'default'
  onFocus?: () => void
  describedById?: string
  ariaLabelledBy?: string
  placeholder?: string
}

export function DestinationSearchInput({
  id,
  listboxId,
  value,
  expanded,
  activeOptionId,
  inputRef,
  onChange,
  onKeyDown,
  variant = 'default',
  onFocus,
  describedById,
  ariaLabelledBy,
  placeholder = '여행지 검색',
}: DestinationSearchInputProps) {
  const className =
    variant === 'bar'
      ? 'destination-search-input destination-search-input--bar'
      : 'destination-search-input'

  return (
    <input
      ref={inputRef}
      id={id}
      className={className}
      type="search"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={expanded}
      aria-controls={expanded ? listboxId : undefined}
      aria-activedescendant={activeOptionId}
      aria-haspopup="listbox"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={describedById}
      data-testid="structured-search-input-field-query"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      placeholder={placeholder}
      name="query"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    />
  )
}
