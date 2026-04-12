export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function compareDays(firstDate, secondDate) {
  const firstTime = startOfDay(firstDate).getTime()
  const secondTime = startOfDay(secondDate).getTime()

  if (firstTime === secondTime) {
    return 0
  }

  return firstTime > secondTime ? 1 : -1
}

export function isSameDay(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    return false
  }

  return compareDays(firstDate, secondDate) === 0
}

export function isSameMonth(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    return false
  }

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth()
  )
}

export function getMonthDifference(firstDate, secondDate) {
  return (
    (secondDate.getFullYear() - firstDate.getFullYear()) * 12 +
    (secondDate.getMonth() - firstDate.getMonth())
  )
}

export function formatDayLabel(date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

export function formatMonthYear(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
}

export function formatFlexibleMonth(date) {
  return `${date.getMonth() + 1}월 ${date.getFullYear()}년`
}

export function buildCalendarGrid(monthDate) {
  const firstDayOfMonth = startOfMonth(monthDate)
  const leadingEmptyDays = firstDayOfMonth.getDay()
  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0,
  ).getDate()
  const totalCells = Math.ceil((leadingEmptyDays + daysInMonth) / 7) * 7

  return Array.from({ length: totalCells }, (_, index) => {
    const dayOfMonth = index - leadingEmptyDays + 1

    if (dayOfMonth < 1 || dayOfMonth > daysInMonth) {
      return null
    }

    return new Date(monthDate.getFullYear(), monthDate.getMonth(), dayOfMonth)
  })
}

export function isDateInRange(date, startDate, endDate) {
  if (!date || !startDate || !endDate) {
    return false
  }

  return compareDays(date, startDate) > 0 && compareDays(date, endDate) < 0
}
