import { useEffect, useRef } from 'react'
import GuestRow from './GuestRow'
import './GuestSelector.css'

const GUEST_TYPES = [
  { key: 'adults', label: '성인', description: '13세 이상' },
  { key: 'children', label: '어린이', description: '2~12세' },
  { key: 'infants', label: '유아', description: '2세 미만' },
  { key: 'pets', label: '반려동물', description: '보조동물을 동반하시나요?' },
]

function GuestSelector({ guests, setGuests, onClose }) {
  const selectorRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleCountChange = (type, delta) => {
    setGuests((prev) => {
      const newValue = prev[type] + delta
      if (newValue < 0) return prev
      if (type === 'adults' && newValue > 16) return prev
      if (type === 'children' && newValue > 5) return prev
      if (type === 'infants' && newValue > 5) return prev
      if (type === 'pets' && newValue > 5) return prev

      const updated = { ...prev, [type]: newValue }

      if (type !== 'adults' && newValue > 0 && updated.adults === 0) {
        updated.adults = 1
      }

      return updated
    })
  }

  return (
    <div className="guest-selector" ref={selectorRef}>
      {GUEST_TYPES.map(({ key, label, description }) => (
        <GuestRow
          key={key}
          label={label}
          description={description}
          count={guests[key]}
          onIncrement={() => handleCountChange(key, 1)}
          onDecrement={() => handleCountChange(key, -1)}
        />
      ))}
    </div>
  )
}

export default GuestSelector
