import { useState, useEffect, useRef } from 'react';
import { RECOMMENDATIONS, SEARCH_RESULTS } from '../../data/DestinationData';
import { matchesKoreanSearch } from '../../utils/koreanSearch';
import DestinationRow from './DestinationRow';

function DestinationSelector() {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, [isOpen]);

  const filteredResults = keyword.trim()
    ? SEARCH_RESULTS.filter((item) =>
        matchesKoreanSearch(keyword, item.title) ||
        matchesKoreanSearch(keyword, item.description)
      )
    : RECOMMENDATIONS;

  const listLabel = keyword.trim() ? '검색 결과' : '추천 여행지';

  const handleSelect = (title) => {
    setKeyword(title);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* 입력부 */}
      <div 
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex flex-col gap-1 border border-gray-300 rounded-3xl px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm ${isOpen ? 'bg-white shadow-md border-transparent' : ''}`}
      >
        <label className="text-xs font-bold uppercase tracking-wider cursor-pointer">여행지</label>
        <input
          ref={inputRef}
          type="text"
          placeholder="여행지 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen) setIsOpen(true);
          }}
          className="bg-transparent outline-none text-sm font-semibold placeholder-gray-500 w-full"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-3 w-[400px] bg-white border border-gray-200 rounded-3xl p-4 shadow-xl z-50">
          <p className="text-xs font-bold p-4">{listLabel}</p>
          <div className="max-h-[400px] overflow-y-auto">
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <DestinationRow
                  key={item.id}
                  title={item.title}
                  description={item.description}
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