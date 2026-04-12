import { WEEKDAY_LABELS } from '../../constants/dateModal.js'
import {
  buildCalendarGrid,
  compareDays,
  formatMonthYear,
  isDateInRange,
  isSameDay,
} from '../../utils/date.js'

function CalendarMonth({
  monthDate,
  today,
  checkInDate,
  checkOutDate,
  onSelectDate,
}) {
  const calendarCells = buildCalendarGrid(monthDate)
  const monthKey = `${monthDate.getFullYear()}-${monthDate.getMonth()}`

  return (
    <div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-medium text-zinc-400">
        {WEEKDAY_LABELS.map((label) => (
          <span key={`${monthKey}-${label}`}>{label}</span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
        {calendarCells.map((date, index) => {
          if (!date) {
            return <div key={`${monthKey}-empty-${index}`} className="h-10" />
          }

          const isPastDate = compareDays(date, today) < 0
          const isCheckInDate = isSameDay(date, checkInDate)
          const isCheckOutDate = isSameDay(date, checkOutDate)
          const isSelected = isCheckInDate || isCheckOutDate
          const isWithinRange = isDateInRange(date, checkInDate, checkOutDate)
          const isRangeEdge =
            checkInDate && checkOutDate && (isCheckInDate || isCheckOutDate)

          return (
            <div
              key={date.toISOString()}
              className={[
                'flex h-10 items-center justify-center px-1',
                isWithinRange || isRangeEdge ? 'bg-zinc-100' : '',
                isCheckInDate && checkOutDate ? 'rounded-l-full' : '',
                isCheckOutDate && checkInDate ? 'rounded-r-full' : '',
              ].join(' ')}
            >
              <button
                type="button"
                disabled={isPastDate}
                onClick={() => onSelectDate(date)}
                aria-label={`${formatMonthYear(monthDate)} ${date.getDate()}일 선택`}
                className={[
                  'inline-flex h-10 w-10 items-center justify-center rounded-full text-sm transition',
                  isSelected
                    ? 'bg-zinc-900 font-semibold text-white shadow-[0_8px_20px_rgba(24,24,27,0.24)]'
                    : isPastDate
                      ? 'cursor-not-allowed text-zinc-200'
                      : 'text-zinc-800 hover:bg-zinc-100',
                ].join(' ')}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarMonth
