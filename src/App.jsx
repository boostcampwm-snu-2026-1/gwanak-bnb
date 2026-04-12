import { useEffect, useMemo, useRef, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import {
  MAX_INFANTS,
  MAX_PETS,
  MAX_PRIMARY_GUESTS,
  MIN_ADULTS_WITH_DEPENDENTS,
} from './constants/guestLimits.js'
import {
  compareDays,
  formatDayLabel,
} from './utils/date.js'

function App() {
  const [activeTab, setActiveTab] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [dateModalTab, setDateModalTab] = useState('exact')
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [checkInFlexibility, setCheckInFlexibility] = useState('정확한 날짜')
  const [checkOutFlexibility, setCheckOutFlexibility] = useState('정확한 날짜')
  const [flexibleStay, setFlexibleStay] = useState(null)
  const [flexibleMonths, setFlexibleMonths] = useState([])

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const searchAreaRef = useRef(null)

  const hasDestinationValue = selectedDestination !== null
  const totalGuests = guests.adults + guests.children
  const hasGuestValue =
    guests.adults > 0 ||
    guests.children > 0 ||
    guests.infants > 0 ||
    guests.pets > 0
  const hasExactDateValue = checkInDate !== null || checkOutDate !== null
  const hasFlexibleDateValue = flexibleStay !== null
  const hasDateValue =
    dateModalTab === 'flexible' ? hasFlexibleDateValue : hasExactDateValue
  const guestSummaryText = useMemo(() => {
    const guestLabel =
      totalGuests >= MAX_PRIMARY_GUESTS
        ? `게스트 ${MAX_PRIMARY_GUESTS}명 이상`
        : totalGuests === 0
          ? '게스트 추가'
          : `게스트 ${totalGuests}명`
    const extraLabels = []

    if (guests.infants > 0) {
      extraLabels.push(`유아 ${guests.infants}명`)
    }

    if (guests.pets > 0) {
      extraLabels.push(`반려동물 ${guests.pets}마리`)
    }

    if (extraLabels.length === 0) {
      return guestLabel
    }

    return `${guestLabel} · ${extraLabels.join(' · ')}`
  }, [guests.infants, guests.pets, totalGuests])
  const destinationSummaryText = useMemo(() => {
    if (!selectedDestination) {
      return '여행지 검색'
    }

    return selectedDestination.title
  }, [selectedDestination])
  const dateSummaryText = useMemo(() => {
    const formatDateSummary = (date, flexibility) => {
      const formattedDate = formatDayLabel(date)

      if (flexibility === '정확한 날짜') {
        return formattedDate
      }

      return `${formattedDate} (${flexibility})`
    }
    const formatFlexibleSummary = () => {
      if (!flexibleStay) {
        return '언제든지'
      }

      if (flexibleMonths.length === 0) {
        return `언제든 ${flexibleStay}`
      }

      const sortedMonthLabels = [...flexibleMonths]
        .sort((firstMonth, secondMonth) => firstMonth.getTime() - secondMonth.getTime())
        .map((monthDate) => `${monthDate.getMonth() + 1}월`)
      const visibleMonthLabels =
        sortedMonthLabels.length <= 4
          ? sortedMonthLabels.join(', ')
          : `${sortedMonthLabels.slice(0, 4).join(', ')}...`

      return `${visibleMonthLabels}의 ${flexibleStay}`
    }

    if (dateModalTab === 'flexible') {
      return formatFlexibleSummary()
    }

    if (checkInDate && checkOutDate) {
      return `${formatDateSummary(checkInDate, checkInFlexibility)} - ${formatDateSummary(checkOutDate, checkOutFlexibility)}`
    }

    if (checkInDate) {
      return formatDateSummary(checkInDate, checkInFlexibility)
    }

    return '날짜 추가'
  }, [
    checkInDate,
    checkInFlexibility,
    checkOutDate,
    checkOutFlexibility,
    flexibleMonths,
    flexibleStay,
    dateModalTab,
  ])

  const handleSelectTab = (tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab))
  }

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination)
    setActiveTab(null)
  }

  const handleSelectExactDate = (date) => {
    if (!checkInDate || checkOutDate) {
      setCheckInDate(date)
      setCheckOutDate(null)
      return
    }

    const comparison = compareDays(date, checkInDate)

    if (comparison < 0) {
      setCheckInDate(date)
      return
    }

    if (comparison === 0) {
      setCheckOutDate(null)
      return
    }

    setCheckOutDate(date)
  }

  const handleCheckInFlexibilityChange = (option) => {
    setCheckInFlexibility(option)
  }

  const handleCheckOutFlexibilityChange = (option) => {
    setCheckOutFlexibility(option)
  }

  const handleFlexibleStayChange = (option) => {
    setFlexibleStay(option)
  }

  const handleFlexibleMonthChange = (month) => {
    setFlexibleMonths((previousMonths) => {
      const hasMonth = previousMonths.some(
        (selectedMonth) =>
          selectedMonth.getFullYear() === month.getFullYear() &&
          selectedMonth.getMonth() === month.getMonth(),
      )

      if (hasMonth) {
        return previousMonths.filter(
          (selectedMonth) =>
            !(
              selectedMonth.getFullYear() === month.getFullYear() &&
              selectedMonth.getMonth() === month.getMonth()
            ),
        )
      }

      return [...previousMonths, month]
    })
  }

  const handleGuestCountChange = (type, delta) => {
    setGuests((prev) => {
      const next = { ...prev }
      const totalPrimaryGuests = prev.adults + prev.children

      if (type === 'adults') {
        if (delta > 0 && totalPrimaryGuests >= MAX_PRIMARY_GUESTS) {
          return prev
        }

        const hasDependentGuests =
          prev.children > 0 || prev.infants > 0 || prev.pets > 0
        const minAdults = hasDependentGuests ? MIN_ADULTS_WITH_DEPENDENTS : 0
        next.adults = Math.max(minAdults, prev.adults + delta)
        return next
      }

      if (
        type === 'children' &&
        delta > 0 &&
        totalPrimaryGuests >= MAX_PRIMARY_GUESTS
      ) {
        return prev
      }

      if (type === 'infants') {
        if (delta > 0) {
          next.infants = Math.min(MAX_INFANTS, prev.infants + delta)
        } else {
          next.infants = Math.max(0, prev.infants + delta)
        }
      } else if (type === 'pets') {
        if (delta > 0) {
          next.pets = Math.min(MAX_PETS, prev.pets + delta)
        } else {
          next.pets = Math.max(0, prev.pets + delta)
        }
      } else {
        next[type] = Math.max(0, prev[type] + delta)
      }

      const hasDependentGuests =
        next.children > 0 || next.infants > 0 || next.pets > 0

      if (
        hasDependentGuests &&
        next.adults < MIN_ADULTS_WITH_DEPENDENTS
      ) {
        next.adults = MIN_ADULTS_WITH_DEPENDENTS
      }

      return next
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target)
      ) {
        setActiveTab(null)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveTab(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const destinationSelection = {
    selectedDestination,
    hasValue: hasDestinationValue,
    summaryText: destinationSummaryText,
  }
  const destinationActions = {
    onSelectDestination: handleSelectDestination,
  }
  const dateSelection = {
    modalTab: dateModalTab,
    hasValue: hasDateValue,
    summaryText: dateSummaryText,
    checkInDate,
    checkOutDate,
    checkInFlexibility,
    checkOutFlexibility,
    flexibleStay,
    flexibleMonths,
  }
  const dateActions = {
    onChangeModalTab: setDateModalTab,
    onSelectExactDate: handleSelectExactDate,
    onChangeCheckInFlexibility: handleCheckInFlexibilityChange,
    onChangeCheckOutFlexibility: handleCheckOutFlexibilityChange,
    onChangeFlexibleStay: handleFlexibleStayChange,
    onChangeFlexibleMonth: handleFlexibleMonthChange,
  }
  const guestSelection = {
    guests,
    hasValue: hasGuestValue,
    summaryText: guestSummaryText,
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 sm:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
          <p className="font-montserrat text-lg font-bold tracking-tight text-rose-500">
            gwanakbnb
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            어디로 떠나볼까요?
          </h1>

          <div className="mt-8 pb-2">
            <div ref={searchAreaRef} className="min-w-[720px]">
              <SearchBar
                activeTab={activeTab}
                destinationSelection={destinationSelection}
                destinationActions={destinationActions}
                dateSelection={dateSelection}
                dateActions={dateActions}
                guestSelection={guestSelection}
                onSelectTab={handleSelectTab}
                onChangeGuestCount={handleGuestCountChange}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
