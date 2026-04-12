import { DATE_MODAL_TABS } from '../constants/dateModal.js'
import ExactDatePanel from './date-modal/ExactDatePanel.jsx'
import FlexibleDatePanel from './date-modal/FlexibleDatePanel.jsx'

function DateModal({
  modalTab,
  onChangeModalTab,
  checkInDate,
  checkOutDate,
  onSelectExactDate,
  checkInFlexibility,
  checkOutFlexibility,
  onChangeCheckInFlexibility,
  onChangeCheckOutFlexibility,
  flexibleStay,
  onChangeFlexibleStay,
  flexibleMonths,
  onChangeFlexibleMonth,
}) {
  return (
    <section className="rounded-[32px] border border-zinc-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:p-8">
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-zinc-100 p-1">
          {DATE_MODAL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeModalTab(tab.id)}
              className={[
                'rounded-full px-5 py-2 text-sm font-medium transition',
                modalTab === tab.id
                  ? 'bg-white text-zinc-900 shadow-[0_6px_16px_rgba(0,0,0,0.08)]'
                  : 'text-zinc-500 hover:text-zinc-800',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {modalTab === 'exact' ? (
        <ExactDatePanel
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onSelectExactDate={onSelectExactDate}
          checkInFlexibility={checkInFlexibility}
          checkOutFlexibility={checkOutFlexibility}
          onChangeCheckInFlexibility={onChangeCheckInFlexibility}
          onChangeCheckOutFlexibility={onChangeCheckOutFlexibility}
        />
      ) : (
        <FlexibleDatePanel
          flexibleStay={flexibleStay}
          onChangeFlexibleStay={onChangeFlexibleStay}
          flexibleMonths={flexibleMonths}
          onChangeFlexibleMonth={onChangeFlexibleMonth}
        />
      )}
    </section>
  )
}

export default DateModal
