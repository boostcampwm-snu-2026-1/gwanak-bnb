import { useMemo, useState } from 'react'
import { DATE_FLEXIBILITY_OPTIONS } from '../../constants/dateModal.js'
import {
  addMonths,
  compareDays,
  formatMonthYear,
  startOfDay,
  startOfMonth,
} from '../../utils/date.js'
import CalendarMonth from './CalendarMonth.jsx'
import FlexibilityField from './FlexibilityField.jsx'
import NavigationButton from './NavigationButton.jsx'

function ExactDatePanel({
  checkInDate,
  checkOutDate,
  onSelectExactDate,
  checkInFlexibility,
  checkOutFlexibility,
  onChangeCheckInFlexibility,
  onChangeCheckOutFlexibility,
}) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const currentMonth = useMemo(() => startOfMonth(today), [today])
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(checkInDate ?? today),
  )
  const [openFlexibilityField, setOpenFlexibilityField] = useState(null)

  const canGoToPreviousMonth = compareDays(visibleMonth, currentMonth) > 0

  const handlePreviousMonth = () => {
    setVisibleMonth((previousMonth) => {
      if (compareDays(previousMonth, currentMonth) <= 0) {
        return previousMonth
      }

      return addMonths(previousMonth, -1)
    })
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] items-start gap-x-4">
        <div className="pt-1">
          <NavigationButton
            direction="left"
            disabled={!canGoToPreviousMonth}
            ariaLabel="이전 달 보기"
            onClick={handlePreviousMonth}
          />
        </div>

        {[visibleMonth, addMonths(visibleMonth, 1)].map((monthDate) => (
          <div key={formatMonthYear(monthDate)}>
            <h3 className="text-center text-base font-semibold text-zinc-900">
              {formatMonthYear(monthDate)}
            </h3>

            <div className="mt-4">
              <CalendarMonth
                monthDate={monthDate}
                today={today}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                onSelectDate={onSelectExactDate}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-1">
          <NavigationButton
            direction="right"
            ariaLabel="다음 달 보기"
            onClick={() =>
              setVisibleMonth((previousMonth) => addMonths(previousMonth, 1))
            }
          />
        </div>
      </div>

      <div className="mt-4 border-t border-zinc-100 pt-4">
        <div
          role="group"
          aria-label="유연한 일정"
          className="mx-auto grid w-full max-w-[560px] grid-cols-2 rounded-[28px] border border-zinc-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
        >
          <FlexibilityField
            label="체크인"
            value={checkInFlexibility}
            options={DATE_FLEXIBILITY_OPTIONS}
            ariaLabel="체크인 유연성 선택"
            onChange={onChangeCheckInFlexibility}
            isOpen={openFlexibilityField === 'check-in'}
            onToggle={() =>
              setOpenFlexibilityField((currentField) =>
                currentField === 'check-in' ? null : 'check-in',
              )
            }
            onClose={() => setOpenFlexibilityField(null)}
            isFirst
          />

          <FlexibilityField
            label="체크아웃"
            value={checkOutFlexibility}
            options={DATE_FLEXIBILITY_OPTIONS}
            ariaLabel="체크아웃 유연성 선택"
            onChange={onChangeCheckOutFlexibility}
            isOpen={openFlexibilityField === 'check-out'}
            onToggle={() =>
              setOpenFlexibilityField((currentField) =>
                currentField === 'check-out' ? null : 'check-out',
              )
            }
            onClose={() => setOpenFlexibilityField(null)}
            isLast
          />
        </div>
      </div>
    </div>
  )
}

export default ExactDatePanel
