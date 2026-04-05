import { useState, useEffect, useRef } from 'react'
import GuestModal from './GuestModal'

const initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 }

function getSummary(guests) {
  const totalPeople = guests.adults + guests.children
  const parts = []
  if (totalPeople > 0) parts.push(`게스트 ${totalPeople}명`)
  if (guests.infants > 0) parts.push(`유아 ${guests.infants}명`)
  if (guests.pets > 0) parts.push(`반려동물 ${guests.pets}마리`)
  if (parts.length > 2) return parts.slice(0, 2).join(', ') + ', ...'
  return parts.join(', ')
}

export default function GuestField({ isOpen, onToggle }) {
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
  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0)

  const handleReset = (e) => {
    e.stopPropagation()
    setGuests(initialGuests)
  }

  return (
    <div ref={containerRef} className="relative flex-1 h-full flex items-center">
      <button
        onClick={() => onToggle(prev => !prev)}
        className="flex flex-col items-start px-6 h-16 justify-center text-left cursor-pointer flex-1"
      >
        <span className="text-xs font-semibold text-gray-900">여행자</span>
        <span className={`text-sm mt-0.5 truncate ${summary ? 'text-gray-900' : 'text-gray-400'}`}>
          {summary || '게스트 추가'}
        </span>
      </button>

      {isOpen && totalGuests > 0 && (
        <button
          onClick={handleReset}
          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center flex-shrink-0 mr-[72px] transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {isOpen && <GuestModal guests={guests} onChange={setGuests} />}
    </div>
  )
}
