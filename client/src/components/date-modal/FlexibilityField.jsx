import { useEffect, useRef } from 'react'
import { CheckIcon, ChevronIcon } from '../icons'

function FlexibilityField({
  label,
  value,
  options,
  ariaLabel,
  onChange,
  isOpen = false,
  onToggle,
  onClose,
  isFirst = false,
  isLast = false,
}) {
  const fieldRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (fieldRef.current && !fieldRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={fieldRef}
      className={[
        'relative bg-white transition',
        isFirst ? 'border-r border-zinc-200' : '',
        isFirst ? 'rounded-l-[26px]' : '',
        isLast ? 'rounded-r-[26px]' : '',
      ].join(' ')}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={onToggle}
        className={[
          'flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition',
          'focus-visible:outline-none',
          isOpen ? 'bg-zinc-50' : 'hover:bg-zinc-50',
        ].join(' ')}
      >
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-zinc-500">
            {label}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-zinc-900">
            {value}
          </p>
        </div>

        <span
          className={`flex-shrink-0 text-zinc-500 transition ${
            isOpen ? 'rotate-180 text-zinc-800' : ''
          }`}
        >
          <ChevronIcon direction="down" />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute inset-x-0 bottom-[calc(100%+0.75rem)] z-30">
          <div className="overflow-hidden rounded-[20px] border border-zinc-200 bg-white p-2 shadow-[0_22px_40px_rgba(15,23,42,0.14)]">
            <div role="listbox" aria-label={ariaLabel} className="space-y-1">
              {options.map((option) => {
                const isSelected = option === value

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option)
                      onClose()
                    }}
                    className={[
                      'flex w-full items-center justify-between gap-3 rounded-[16px] px-3.5 py-2.5 text-left transition',
                      isSelected
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900',
                    ].join(' ')}
                  >
                    <p className="text-sm font-semibold">{option}</p>

                    <span
                      className={`flex-shrink-0 ${
                        isSelected ? 'text-rose-500' : 'text-zinc-300'
                      }`}
                    >
                      <CheckIcon />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default FlexibilityField
