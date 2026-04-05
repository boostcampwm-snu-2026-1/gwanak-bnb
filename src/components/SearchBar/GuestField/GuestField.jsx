import { useState, useEffect, useRef } from 'react'
import GuestModal from './GuestModal'

const initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 }

function getSummary(guests) {
  const totalPeople = guests.adults + guests.children
  const parts = []
  if (totalPeople > 0) parts.push(`게스트 ${totalPeople}명`)
  if (guests.infants > 0) parts.push(`유아 ${guests.infants}명`)
  if (guests.pets > 0) parts.push(`반려동물 ${guests.pets}마리`)
  return parts.join(', ')
}

export default function GuestField({ isOpen, onToggle, searchButton }) {
  const [guests, setGuests] = useState(initialGuests)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onToggle(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const summary = getSummary(guests)

  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        onClick={() => onToggle(prev => !prev)}
        className="flex flex-col items-start px-6 py-3 text-left cursor-pointer w-full"
      >
        <span className="text-xs font-semibold text-gray-900">여행자</span>
        <span className={`text-sm mt-0.5 ${summary ? 'text-gray-900' : 'text-gray-400'}`}>
          {summary || '게스트 추가'}
        </span>
      </button>

      {isOpen && <GuestModal guests={guests} onChange={setGuests} />}
    </div>
  )
}
