import { useState } from 'react'
import DestinationField from './DestinationField'
import DateField from './DateField'
import GuestField from './GuestField/GuestField'

function SearchButton({ isOpen }) {
  return (
    <div className="relative w-12 h-12 flex-shrink-0 mr-2">
      <button className={`absolute right-0 top-0 h-12 bg-[#FF385C] rounded-full flex items-center gap-2 text-white hover:bg-[#e0314f] transition-all duration-200 cursor-pointer ${isOpen ? 'px-4' : 'w-12 justify-center'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        {isOpen && <span className="text-sm font-semibold whitespace-nowrap">검색</span>}
      </button>
    </div>
  )
}

export default function SearchBar() {
  const [guestOpen, setGuestOpen] = useState(false)

  return (
    <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-md h-16 w-full max-w-3xl">
      <DestinationField />
      <div className="w-px h-8 bg-gray-200 flex-shrink-0" />
      <DateField />
      <div className="w-px h-8 bg-gray-200 flex-shrink-0" />
      <GuestField isOpen={guestOpen} onToggle={setGuestOpen} />
      <SearchButton isOpen={guestOpen} />
    </div>
  )
}
