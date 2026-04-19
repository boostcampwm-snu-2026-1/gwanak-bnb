import { useState, useEffect, useRef } from 'react';
import { RECOMMENDATIONS, SEARCH_RESULTS } from '../../data/DestinationData';
import { matchesKoreanSearch } from '../../utils/koreanSearch';
import DestinationRow from './DestinationRow';

function DestinationSelector({ value = '', onChange }) {
  const [keyword, setKeyword] = useState(value);
  const [previewValue, setPreviewValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setKeyword(value || '');
  }, [value]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isOpen]);

  const filteredResults = keyword.trim()
    ? SEARCH_RESULTS.filter((item) =>
        matchesKoreanSearch(keyword, item.title) ||
        matchesKoreanSearch(keyword, item.description)
      )
    : RECOMMENDATIONS;

  const listLabel = keyword.trim() ? '검색 결과' : '추천 여행지';
  const displayValue = previewValue !== null ? previewValue : keyword;

  useEffect(() => {
    if (isOpen && filteredResults.length > 0) {
      setActiveIndex(0);
      setPreviewValue(null);
    }
  }, [isOpen, filteredResults.length]);

  const handleSelect = (title) => {
    setKeyword(title);
    setPreviewValue(null);
    setIsOpen(false);
    onChange?.(title);
  };

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    setKeyword(nextValue);
    setPreviewValue(null);
    onChange?.(nextValue);
  };

  const handleKeyDown = (event) => {
    if (!isOpen || filteredResults.length === 0) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = event.key === 'ArrowDown'
        ? (activeIndex + 1) % filteredResults.length
        : (activeIndex - 1 + filteredResults.length) % filteredResults.length;

      setActiveIndex(nextIndex);
      setPreviewValue(filteredResults[nextIndex].title);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      handleSelect(filteredResults[activeIndex].title);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* 입력부 */}
      <div 
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex flex-col gap-1 border border-gray-300 rounded-3xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm ${isOpen ? 'bg-white shadow-md border-transparent' : ''}`}
      >
        <label className="text-xs font-bold uppercase tracking-wider cursor-pointer">여행지</label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="여행지 검색"
            value={displayValue}
            onChange={handleInputChange}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOpen) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-sm font-semibold placeholder-gray-500 w-full pr-8"
          />
          {displayValue && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setKeyword('');
                setPreviewValue(null);
                setIsOpen(true);
                inputRef.current?.focus();
                onChange?.('');
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-gray-100 border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-200"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-3 w-[400px] bg-white border border-gray-200 rounded-3xl p-4 shadow-xl z-50">
          <p className="text-xs font-bold p-4">{listLabel}</p>
          <div className="max-h-[400px] overflow-y-auto">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => (
                <DestinationRow
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  isActive={index === activeIndex}
                  onClick={() => handleSelect(item.title)}
                />
              ))
            ) : (
              <div className="p-4 text-sm text-gray-500">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationSelector;