import styles from './GuestModal.module.css'

const rows = [
  {
    key: 'adults',
    title: '성인',
    subtitle: '13세 이상',
  },
  {
    key: 'children',
    title: '어린이',
    subtitle: '2~12세',
  },
  {
    key: 'infants',
    title: '유아',
    subtitle: '2세 미만',
  },
  {
    key: 'pets',
    title: '반려동물',
    subtitle: '보조동물을 동반하시나요?',
  },
]

function GuestModal({ id, guestCounts, onIncrement, onDecrement }) {
  return (
    <section className={styles.modal} id={id} role="dialog" aria-modal="true" aria-label="여행자 선택">
      {rows.map((row) => {
        const count = guestCounts[row.key]
        const decrementDisabled = count === 0

        return (
          <div className={styles.row} key={row.key}>
            <div>
              <strong className={styles.title}>{row.title}</strong>
              <p className={styles.subtitle}>{row.subtitle}</p>
            </div>

            <div className={styles.counter}>
              <button
                type="button"
                className={styles.circleButton}
                disabled={decrementDisabled}
                onClick={() => onDecrement(row.key)}
                aria-label={`${row.title} 감소`}
              >
                −
              </button>
              <span className={styles.count}>{count}</span>
              <button
                type="button"
                className={styles.circleButton}
                onClick={() => onIncrement(row.key)}
                aria-label={`${row.title} 증가`}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default GuestModal
