import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { formatGuestSummary, type GuestCounts } from './guestPickerUtils'
import './GuestPickerModal.css'

const MAX_TOTAL_GUESTS = 16
const MIN_ADULTS = 0
const MAX_INFANTS = 5
const MAX_PETS = 5

type GuestPickerModalProps = {
  open: boolean
  onClose: () => void
  value: GuestCounts
  onChange: (next: GuestCounts) => void
}

export function GuestPickerModal({
  open,
  onClose,
  value,
  onChange,
}: GuestPickerModalProps) {
  const titleId = useId()
  const serviceAnimalTitleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const [serviceAnimalModalOpen, setServiceAnimalModalOpen] = useState(false)

  const totalGuests = value.adults + value.children
  const canAddGuest = totalGuests < MAX_TOTAL_GUESTS
  const canRemoveAdult = value.adults > MIN_ADULTS
  const canAddAdult = canAddGuest
  const canRemoveChild = value.children > 0
  const canAddChild = canAddGuest
  const canRemoveInfant = value.infants > 0
  const canAddInfant = value.infants < MAX_INFANTS
  const canRemovePet = value.pets > 0
  const canAddPet = value.pets < MAX_PETS

  const set = useCallback(
    (patch: Partial<GuestCounts>) => {
      onChange({ ...value, ...patch })
    },
    [onChange, value],
  )

  const handleClose = useCallback(() => {
    setServiceAnimalModalOpen(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (serviceAnimalModalOpen) {
        setServiceAnimalModalOpen(false)
      } else {
        handleClose()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, handleClose, serviceAnimalModalOpen])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <>
    <div
      className="guest-modal-root"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={panelRef}
        className="guest-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="guest-modal-header">
          <button
            type="button"
            className="guest-modal-close"
            onClick={handleClose}
            aria-label="닫기"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M3 3 L13 13 M13 3 L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h2 id={titleId} className="guest-modal-title">
            인원
          </h2>
        </div>

        <div className="guest-modal-body">
          <GuestRow
            label="성인"
            description="만 13세 이상"
            value={value.adults}
            onDecrement={() =>
              canRemoveAdult && set({ adults: value.adults - 1 })
            }
            onIncrement={() => canAddAdult && set({ adults: value.adults + 1 })}
            decrementDisabled={!canRemoveAdult}
            incrementDisabled={!canAddAdult}
            decrementLabel="성인 한 명 줄이기"
            incrementLabel="성인 한 명 늘리기"
          />
          <GuestRow
            label="어린이"
            description="만 2~12세"
            value={value.children}
            onDecrement={() =>
              canRemoveChild && set({ children: value.children - 1 })
            }
            onIncrement={() =>
              canAddChild && set({ children: value.children + 1 })
            }
            decrementDisabled={!canRemoveChild}
            incrementDisabled={!canAddChild}
            decrementLabel="어린이 한 명 줄이기"
            incrementLabel="어린이 한 명 늘리기"
          />
          <GuestRow
            label="유아"
            description="만 2세 미만"
            value={value.infants}
            onDecrement={() =>
              canRemoveInfant && set({ infants: value.infants - 1 })
            }
            onIncrement={() =>
              canAddInfant && set({ infants: value.infants + 1 })
            }
            decrementDisabled={!canRemoveInfant}
            incrementDisabled={!canAddInfant}
            decrementLabel="유아 한 명 줄이기"
            incrementLabel="유아 한 명 늘리기"
          />
          <GuestRow
            label="반려동물"
            description="보조동물을 동반하시나요?"
            onDescriptionClick={() => setServiceAnimalModalOpen(true)}
            value={value.pets}
            onDecrement={() => canRemovePet && set({ pets: value.pets - 1 })}
            onIncrement={() => canAddPet && set({ pets: value.pets + 1 })}
            decrementDisabled={!canRemovePet}
            incrementDisabled={!canAddPet}
            decrementLabel="반려동물 한 마리 줄이기"
            incrementLabel="반려동물 한 마리 늘리기"
            valueSuffix="마리"
          />
        </div>
        <div className="guest-modal-footer">
          <span className="guest-modal-summary" aria-live="polite">
            {formatGuestSummary(value)}
          </span>
          <button type="button" className="guest-modal-done" onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
    {serviceAnimalModalOpen && (
      <div
        className="service-animal-modal-root"
        role="presentation"
        data-testid="service-animal-modal-content"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setServiceAnimalModalOpen(false)
        }}
      >
        <div
          className="service-animal-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={serviceAnimalTitleId}
          tabIndex={-1}
        >
          <div className="service-animal-modal-header">
            <button
              type="button"
              className="service-animal-modal-close"
              onClick={() => setServiceAnimalModalOpen(false)}
              aria-label="보조동물 안내 닫기"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <path
                  d="M3 3 L13 13 M13 3 L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="service-animal-modal-body">
            <div className="service-animal-modal-image-wrap">
              <img
                className="service-animal-modal-image"
                src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg"
                width={443}
                height={520}
                decoding="async"
                alt="도우미 반려동물을 동반한 게스트가 호스트의 환영을 받고 있습니다."
              />
            </div>
            <div className="service-animal-modal-copy">
              <h1 id={serviceAnimalTitleId} className="service-animal-modal-title">
                보조동물
              </h1>
              <p className="service-animal-modal-text">
                보조동물은 반려동물이 아니므로 여기에 추가할 필요가 없습니다.
                <br />
                <br />
                정서적 지원 동물과 함께 여행하시나요?{' '}
                <a
                  className="service-animal-modal-link"
                  href="https://www.airbnb.co.kr/help/article/1869"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  접근성 정책
                </a>을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

type GuestRowProps = {
  label: string
  description: string
  onDescriptionClick?: () => void
  value: number
  valueSuffix?: string
  onDecrement: () => void
  onIncrement: () => void
  decrementDisabled: boolean
  incrementDisabled: boolean
  decrementLabel: string
  incrementLabel: string
}

function GuestRow({
  label,
  description,
  onDescriptionClick,
  value,
  valueSuffix = '명',
  onDecrement,
  onIncrement,
  decrementDisabled,
  incrementDisabled,
  decrementLabel,
  incrementLabel,
}: GuestRowProps) {
  return (
    <div className="guest-row">
      <div className="guest-row-text">
        <div className="guest-row-label">{label}</div>
        {onDescriptionClick ? (
          <button
            type="button"
            className="guest-row-desc guest-row-desc-button"
            onClick={onDescriptionClick}
          >
            {description}
          </button>
        ) : (
          <div className="guest-row-desc">{description}</div>
        )}
      </div>
      <div className="guest-stepper" role="group" aria-label={label}>
        <button
          type="button"
          className="guest-stepper-btn"
          onClick={onDecrement}
          disabled={decrementDisabled}
          aria-label={decrementLabel}
        >
          <span className="guest-stepper-icon" aria-hidden>
            −
          </span>
        </button>
        <span className="guest-stepper-value" aria-live="polite">
          {value}
          {valueSuffix}
        </span>
        <button
          type="button"
          className="guest-stepper-btn"
          onClick={onIncrement}
          disabled={incrementDisabled}
          aria-label={incrementLabel}
        >
          <span className="guest-stepper-icon" aria-hidden>
            +
          </span>
        </button>
      </div>
    </div>
  )
}

