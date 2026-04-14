import type { RefObject } from 'react'
import type { Destination } from '../../data/destinations'
import { DestinationSuggestionItem } from './DestinationSuggestionItem'
import './DestinationSearchLayer.css'

export type DestinationSearchLayerProps = {
  panelRef: RefObject<HTMLDivElement | null>
  listboxId: string
  sectionTitleId: string
  panelTitle: string | null
  suggestions: Destination[]
  highlightIndex: number
  getOptionId: (index: number) => string
  onPick: (index: number) => void
  setItemRef: (index: number, el: HTMLDivElement | null) => void
  emptyMessage?: boolean
}

export function DestinationSearchLayer({
  panelRef,
  listboxId,
  sectionTitleId,
  panelTitle,
  suggestions,
  highlightIndex,
  getOptionId,
  onPick,
  setItemRef,
  emptyMessage = false,
}: DestinationSearchLayerProps) {
  return (
    <div
      ref={panelRef}
      className="destination-search-panel"
      role="presentation"
    >
      <div className="destination-search-panel-inner">
        {suggestions.length > 0 ? (
          <div
            className="destination-suggestions-section"
            role="group"
            aria-labelledby={panelTitle ? sectionTitleId : undefined}
          >
            {panelTitle ? (
              <h2
                id={sectionTitleId}
                className="destination-suggestions-section-title"
              >
                {panelTitle}
              </h2>
            ) : null}
            <div
              id={listboxId}
              role="listbox"
              className="destination-suggestions-list"
              aria-labelledby={panelTitle ? sectionTitleId : undefined}
            >
              {suggestions.map((d, i) => (
                <DestinationSuggestionItem
                  key={d.id}
                  ref={(el) => {
                    setItemRef(i, el)
                  }}
                  id={getOptionId(i)}
                  label={d.label}
                  subtitle={d.subtitle}
                  tagline={d.tagline}
                  iconKey={d.iconKey}
                  selected={i === highlightIndex}
                  onSelect={() => onPick(i)}
                  data-testid={`option-${i}`}
                />
              ))}
            </div>
          </div>
        ) : emptyMessage ? (
          <div
            className="destination-suggestions-section"
            role="group"
            aria-labelledby={sectionTitleId}
          >
            <h2
              id={sectionTitleId}
              className="destination-suggestions-section-title"
            >
              {panelTitle}
            </h2>
            <div
              id={listboxId}
              role="listbox"
              className="destination-suggestions-list"
              aria-labelledby={sectionTitleId}
            >
              <div className="destination-suggestions-empty" role="status">
                검색 결과가 없습니다
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
