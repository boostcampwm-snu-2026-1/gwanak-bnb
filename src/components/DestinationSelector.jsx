import { useRef } from 'react'
import { CloseIcon } from './icons'

function DestinationSelector({
  query = '',
  hasValue = false,
  isSelected,
  onChangeQuery,
  onClear,
  onOpen,
}) {
  const inputRef = useRef(null)

  const handleClear = (event) => {
    event.preventDefault()
    onClear()
    inputRef.current?.focus()
  }

  return (
    <label
      htmlFor="destination-search"
      onClick={onOpen}
      className={[
        'block min-w-0 w-full cursor-text rounded-full px-7 py-4 text-left transition-all duration-200',
        isSelected
          ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
          : 'hover:bg-zinc-100',
      ].join(' ')}
    >
      <p className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900">
        여행지
      </p>
      <span className="relative mt-1 block">
        <input
          id="destination-search"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => onChangeQuery(event.target.value)}
          onFocus={onOpen}
          placeholder="여행지 검색"
          className={`w-full border-none bg-transparent p-0 pr-7 text-[13px] outline-none placeholder:text-zinc-500 ${
            isSelected || hasValue ? 'text-zinc-900' : 'text-zinc-500'
          }`}
        />

        {query.trim() ? (
          <button
            type="button"
            aria-label="여행지 검색어 지우기"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            className="absolute right-0 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center text-zinc-400 transition hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          >
            <CloseIcon />
          </button>
        ) : null}
      </span>
    </label>
  )
}

export default DestinationSelector
