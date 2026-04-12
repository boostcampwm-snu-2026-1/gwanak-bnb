import { useEffect, useRef, useState } from "react";
import SuggestionList from "./SuggestionList";
import styles from "./DestinationField.module.css";

const listId = "destination-suggestion-list";

function matchesSuggestion(suggestion, query) {
  if (!query) {
    return true;
  }

  const queryTokens = query.split(/\s+/).filter(Boolean);
  const searchableText = [
    suggestion.label,
    suggestion.region,
    suggestion.description,
    suggestion.keywords.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return queryTokens.every((token) => searchableText.includes(token));
}

function DestinationField({
  value,
  suggestions,
  isOpen,
  onChange,
  onClose,
  onOpen,
}) {
  const inputRef = useRef(null);
  const optionRefs = useRef([]);
  const wasOpenRef = useRef(false);
  const [typedValue, setTypedValue] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = typedValue.trim().toLowerCase();
  const filteredSuggestions = suggestions.filter((suggestion) =>
    matchesSuggestion(suggestion, normalizedQuery),
  );

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setTypedValue(value);
      setActiveIndex(-1);

      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }

    if (!isOpen && wasOpenRef.current) {
      setActiveIndex(-1);
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, value]);

  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= filteredSuggestions.length) {
      return;
    }

    optionRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex, filteredSuggestions.length]);

  useEffect(() => {
    if (activeIndex >= filteredSuggestions.length) {
      setActiveIndex(-1);
    }
  }, [activeIndex, filteredSuggestions.length]);

  function openField() {
    if (!isOpen) {
      onOpen();
    }
  }

  function selectSuggestion(index) {
    const nextSuggestion = filteredSuggestions[index];

    if (!nextSuggestion) {
      return;
    }

    setTypedValue(nextSuggestion.label);
    setActiveIndex(index);
    onChange(nextSuggestion.label);
    onClose();
  }

  function handleInputChange(event) {
    const nextValue = event.target.value;

    if (!isOpen) {
      onOpen();
    }

    setTypedValue(nextValue);
    setActiveIndex(-1);
    onChange(nextValue);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!isOpen) {
        onOpen();
      }

      if (filteredSuggestions.length === 0) {
        return;
      }

      event.preventDefault();

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const fallbackIndex = direction === 1 ? 0 : filteredSuggestions.length - 1;
      const nextIndex =
        activeIndex === -1
          ? fallbackIndex
          : (activeIndex + direction + filteredSuggestions.length) %
            filteredSuggestions.length;

      setActiveIndex(nextIndex);
      onChange(filteredSuggestions[nextIndex].label);
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(activeIndex);
      return;
    }

    if (event.key === "Escape") {
      onClose();
    }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.field} ${isOpen ? styles.fieldActive : ""}`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-owns={listId}
        onClick={openField}
      >
        <span className={styles.label}>여행지</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          className={styles.input}
          placeholder="추천 여행지를 검색해보세요"
          aria-controls={listId}
          aria-activedescendant={
            activeIndex >= 0
              ? `${listId}-option-${filteredSuggestions[activeIndex].id}`
              : undefined
          }
          aria-autocomplete="list"
          onChange={handleInputChange}
          onFocus={openField}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen ? (
        <div className={styles.dropdown}>
          <SuggestionList
            suggestions={filteredSuggestions}
            activeIndex={activeIndex}
            listId={listId}
            optionRefs={optionRefs}
            query={typedValue}
            onHighlight={setActiveIndex}
            onSelect={selectSuggestion}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DestinationField;
