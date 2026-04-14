import { DestinationSearchInput } from './DestinationSearchInput'
import { DestinationSearchLayer } from './DestinationSearchLayer'
import { useDestinationCombobox } from './useDestinationCombobox'
import './DestinationField.css'

export function DestinationField() {
  const combo = useDestinationCombobox()

  return (
    <div className="destination-field">
      <span id={combo.describedById} className="destination-field-visually-hidden">
        지역이나 도시 이름을 입력하면 관련 여행지를 찾을 수 있습니다.
      </span>
      <div
        ref={combo.barRef}
        className="destination-field-bar"
        data-testid="destination-field-trigger"
        onMouseDown={combo.handleBarMouseDown}
      >
        <div id={combo.kickerId} className="search-bar-mock-kicker">
          여행지
        </div>
        <div className="destination-field-input-shell">
          <DestinationSearchInput
            id={combo.comboboxId}
            listboxId={combo.listboxId}
            value={combo.inputValue}
            expanded={combo.isOpen}
            activeOptionId={combo.activeOptionId}
            inputRef={combo.inputRef}
            onChange={combo.handleQueryChange}
            onKeyDown={combo.handleInputKeyDown}
            variant="bar"
            onFocus={combo.openLayer}
            describedById={combo.describedById}
            ariaLabelledBy={combo.kickerId}
          />
        </div>
      </div>

      {combo.isOpen ? (
        <DestinationSearchLayer
          panelRef={combo.panelRef}
          listboxId={combo.listboxId}
          sectionTitleId={combo.sectionTitleId}
          panelTitle={combo.layerPanelTitle}
          suggestions={combo.suggestions}
          highlightIndex={combo.highlightIndex}
          getOptionId={combo.getOptionId}
          onPick={combo.handlePick}
          setItemRef={combo.setItemRef}
          emptyMessage={combo.emptyMessage}
        />
      ) : null}
    </div>
  )
}
