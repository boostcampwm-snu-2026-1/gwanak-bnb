import { useMemo, useState } from 'react'
import {
  FLEXIBLE_MONTH_COUNT,
  FLEXIBLE_STAY_OPTIONS,
  VISIBLE_FLEXIBLE_MONTHS,
} from '../../constants/dateModal.js'
import {
  addMonths,
  getMonthDifference,
  isSameMonth,
  startOfMonth,
} from '../../utils/date.js'
import NavigationButton from './NavigationButton.jsx'

function OptionChip({ label, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={[
        'rounded-full border px-4 py-2 text-sm font-medium transition',
        isSelected
          ? 'border-zinc-900 bg-white text-zinc-900 shadow-[0_8px_18px_rgba(24,24,27,0.08)]'
          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function FlexibleDatePanel({
  flexibleStay,
  onChangeFlexibleStay,
  flexibleMonths,
  onChangeFlexibleMonth,
}) {
  const currentMonth = useMemo(() => startOfMonth(new Date()), [])
  const [flexibleMonthStart, setFlexibleMonthStart] = useState(() => {
    if (flexibleMonths.length === 0) {
      return 0
    }

    const firstFlexibleMonth = [...flexibleMonths].sort(
      (firstMonth, secondMonth) => firstMonth.getTime() - secondMonth.getTime(),
    )[0]
    const initialOffset = getMonthDifference(
      currentMonth,
      startOfMonth(firstFlexibleMonth),
    )
    const maxOffset = FLEXIBLE_MONTH_COUNT - VISIBLE_FLEXIBLE_MONTHS

    return Math.max(0, Math.min(initialOffset, maxOffset))
  })

  const availableFlexibleMonths = useMemo(
    () =>
      Array.from({ length: FLEXIBLE_MONTH_COUNT }, (_, index) =>
        addMonths(currentMonth, index),
      ),
    [currentMonth],
  )
  const visibleFlexibleMonths = availableFlexibleMonths.slice(
    flexibleMonthStart,
    flexibleMonthStart + VISIBLE_FLEXIBLE_MONTHS,
  )
  const canGoToPreviousFlexibleMonth = flexibleMonthStart > 0
  const canGoToNextFlexibleMonth =
    flexibleMonthStart < availableFlexibleMonths.length - VISIBLE_FLEXIBLE_MONTHS

  return (
    <div className="mt-5">
      <div>
        <p className="text-center text-base font-semibold text-zinc-900">
          숙박 기간을 선택하세요.
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {FLEXIBLE_STAY_OPTIONS.map((option) => (
            <OptionChip
              key={option}
              label={option}
              isSelected={flexibleStay === option}
              onClick={() => onChangeFlexibleStay(option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-center text-base font-semibold text-zinc-900">
          여행 날짜를 선택하세요.
        </p>

        <div className="mt-3 flex items-center gap-3">
          <NavigationButton
            direction="left"
            disabled={!canGoToPreviousFlexibleMonth}
            ariaLabel="이전 여행 날짜 보기"
            onClick={() =>
              setFlexibleMonthStart((previousStart) =>
                Math.max(0, previousStart - 1),
              )
            }
          />

          <div className="grid flex-1 grid-cols-4 gap-3">
            {visibleFlexibleMonths.map((monthDate) => {
              const isSelected = flexibleMonths.some((selectedMonth) =>
                isSameMonth(selectedMonth, monthDate),
              )

              return (
                <button
                  key={`${monthDate.getFullYear()}-${monthDate.getMonth()}`}
                  type="button"
                  onClick={() => onChangeFlexibleMonth(monthDate)}
                  aria-pressed={isSelected}
                  className={[
                    'flex min-h-[96px] flex-col items-center justify-center rounded-[24px] border px-4 py-4 text-center transition',
                    isSelected
                      ? 'border-zinc-900 bg-white text-zinc-900 shadow-[0_10px_24px_rgba(24,24,27,0.08)]'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-900 hover:border-zinc-400 hover:bg-white',
                  ].join(' ')}
                >
                  <span className="block text-lg font-semibold">
                    {monthDate.getMonth() + 1}월
                  </span>
                  <span className="mt-1 block text-xs font-medium text-zinc-500">
                    {monthDate.getFullYear()}
                  </span>
                </button>
              )
            })}
          </div>

          <NavigationButton
            direction="right"
            disabled={!canGoToNextFlexibleMonth}
            ariaLabel="다음 여행 날짜 보기"
            onClick={() =>
              setFlexibleMonthStart((previousStart) =>
                Math.min(
                  availableFlexibleMonths.length - VISIBLE_FLEXIBLE_MONTHS,
                  previousStart + 1,
                ),
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default FlexibleDatePanel
