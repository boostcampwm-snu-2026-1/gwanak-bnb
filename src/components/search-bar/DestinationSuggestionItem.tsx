import { forwardRef } from 'react'
import type { DestinationIconKey } from '../../data/destinations'
import { DestinationSuggestIcon } from './destinationSuggestIcons'

export type DestinationSuggestionItemProps = {
  id: string
  label: string
  subtitle?: string
  tagline?: string
  iconKey: DestinationIconKey
  selected: boolean
  onSelect: () => void
  'data-testid'?: string
}

export const DestinationSuggestionItem = forwardRef<
  HTMLDivElement,
  DestinationSuggestionItemProps
>(function DestinationSuggestionItem(
  {
    id,
    label,
    subtitle,
    tagline,
    iconKey,
    selected,
    onSelect,
    'data-testid': dataTestId,
  },
  ref,
) {
  const secondary = tagline ?? subtitle

  return (
    <div
      ref={ref}
      id={id}
      role="option"
      aria-selected={selected}
      data-testid={dataTestId}
      className={
        selected
          ? 'destination-suggestion-item destination-suggestion-item--active'
          : 'destination-suggestion-item'
      }
      onMouseDown={(e) => {
        e.preventDefault()
      }}
      onClick={onSelect}
    >
      <div className="destination-suggestion-item-thumb-wrap">
        <div
          className="destination-suggestion-icon"
          data-icon={iconKey}
          aria-hidden
        >
          <DestinationSuggestIcon iconKey={iconKey} />
        </div>
      </div>
      <div className="destination-suggestion-item-text">
        <div className="destination-suggestion-item-label">{label}</div>
        {secondary ? (
          <div className="destination-suggestion-item-sub">{secondary}</div>
        ) : null}
      </div>
    </div>
  )
})
