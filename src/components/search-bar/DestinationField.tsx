import { DestinationSearchInput } from './DestinationSearchInput'
import { DestinationSearchLayer } from './DestinationSearchLayer'
import { useDestinationCombobox } from './useDestinationCombobox'
import './DestinationField.css'

export type DestinationFieldProps = {
  committedDestinationId: string | null
  onCommittedDestinationIdChange: (id: string | null) => void
}

export function DestinationField({
  committedDestinationId,
  onCommittedDestinationIdChange,
}: DestinationFieldProps) {
  const {
    barRef,
    panelRef,
    inputRef,
    kickerId,
    listboxId,
    comboboxId,
    sectionTitleId,
    describedById,
    isOpen,
    inputValue,
    activeOptionId,
    suggestions,
    highlightIndex,
    layerPanelTitle,
    emptyMessage,
    openLayer,
    handleQueryChange,
    handleInputKeyDown,
    handleBarMouseDown,
    getOptionId,
    handlePick,
    setItemRef,
  } = useDestinationCombobox({
    committedDestinationId,
    onCommittedDestinationIdChange,
  })

  return (
    <div className="destination-field">
      <span id={describedById} className="destination-field-visually-hidden">
        지역이나 도시 이름을 입력하면 관련 여행지를 찾을 수 있습니다.
      </span>
      <div
        ref={barRef}
        className="destination-field-bar"
        data-testid="destination-field-trigger"
        onMouseDown={handleBarMouseDown}
      >
        <div id={kickerId} className="search-bar-mock-kicker">
          여행지
        </div>
        <div className="destination-field-input-shell">
          <DestinationSearchInput
            id={comboboxId}
            listboxId={listboxId}
            value={inputValue}
            expanded={isOpen}
            activeOptionId={activeOptionId}
            inputRef={inputRef}
            onChange={handleQueryChange}
            onKeyDown={handleInputKeyDown}
            variant="bar"
            onFocus={openLayer}
            describedById={describedById}
            ariaLabelledBy={kickerId}
          />
        </div>
      </div>

      {isOpen ? (
        <DestinationSearchLayer
          panelRef={panelRef}
          listboxId={listboxId}
          sectionTitleId={sectionTitleId}
          panelTitle={layerPanelTitle}
          suggestions={suggestions}
          highlightIndex={highlightIndex}
          getOptionId={getOptionId}
          onPick={handlePick}
          setItemRef={setItemRef}
          emptyMessage={emptyMessage}
        />
      ) : null}
    </div>
  )
}
