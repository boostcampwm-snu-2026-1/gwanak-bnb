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

export default function GuestField() {
  const [isOpen, setIsOpen] = useState(false)
  const [guests, setGuests] = useState(initialGuests)
  const containerRef = useRef(null)

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const summary = getSummary(guests)
  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0)

  return (
    <div ref={containerRef} className="relative flex items-center gap-4">
      {/* 여행자 필드 */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex flex-col items-start px-6 text-left cursor-pointer"
      >
        <span className="text-xs font-semibold text-gray-900">여행자</span>
        <span className={`text-sm mt-0.5 ${summary ? 'text-gray-900' : 'text-gray-400'}`}>
          {summary || '게스트 추가'}
        </span>
      </button>

      {/* 검색 버튼 */}
      <button className="w-12 h-12 bg-[#FF385C] rounded-full flex items-center justify-center text-white hover:bg-[#e0314f] transition-colors cursor-pointer flex-shrink-0 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
          <path d="M13 24a11 11 0 1 1 0-22 11 11 0 0 1 0 22zm0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm8.192-2.393 1.415 1.414-5.657 5.657-1.415-1.414z" />
        </svg>
      </button>

      {/* 드롭다운 모달 */}
      {isOpen && <GuestModal guests={guests} onChange={setGuests} />}
    </div>
  )
}
