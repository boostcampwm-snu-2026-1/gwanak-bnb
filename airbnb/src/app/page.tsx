"use client"

import { useState } from "react"
import { GuestSelector } from "./components/GuestSelector"
import { LocationSearch } from "./components/LocationSearch"

export default function Home() {
  // 여행지 상태
  const [location, setLocation] = useState("")
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  // 여행자 상태
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [isGuestOpen, setIsGuestOpen] = useState(false)

  const totalGuests = adults + children
  const guestText = totalGuests > 0 
    ? `게스트 ${totalGuests}명${infants > 0 ? `, 유아 ${infants}명` : ""}`
    : "게스트 추가"

  // 다른 드롭다운이 열리면 기존 것 닫기
  const handleLocationOpen = (open: boolean) => {
    setIsLocationOpen(open)
    if (open) setIsGuestOpen(false)
  }

  const handleGuestOpen = () => {
    setIsGuestOpen(!isGuestOpen)
    if (!isGuestOpen) setIsLocationOpen(false)
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] pt-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-lg border border-gray-200 flex items-center">
          {/* 여행지 */}
          <div className="flex-1">
            <LocationSearch
              value={location}
              onChange={setLocation}
              isOpen={isLocationOpen}
              onOpenChange={handleLocationOpen}
            />
          </div>

          <div className="w-px h-8 bg-gray-200" />

          {/* 날짜 (비활성화) */}
          <div className="flex-1 px-6 py-4 cursor-not-allowed opacity-60">
            <p className="text-xs font-semibold text-[#222]">날짜</p>
            <p className="text-sm text-gray-400">날짜 추가</p>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          {/* 여행자 */}
          <div 
            className={`flex-1 px-6 py-4 cursor-pointer rounded-full transition-colors ${isGuestOpen ? "bg-white shadow-md" : "hover:bg-gray-50"}`}
            onClick={handleGuestOpen}
          >
            <p className="text-xs font-semibold text-[#222]">여행자</p>
            <p className={`text-sm ${totalGuests > 0 ? "text-[#222]" : "text-gray-400"}`}>
              {guestText}
            </p>
          </div>

          {/* 검색 버튼 */}
          <button 
            className="bg-[#ff385c] hover:bg-[#e31c5f] text-white p-3 rounded-full mr-2 transition-colors"
            aria-label="검색"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Guest Selector Dropdown */}
        {isGuestOpen && (
          <div className="mt-2 ml-auto w-96 bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
            <GuestSelector
              adults={adults}
              children={children}
              infants={infants}
              onAdultsChange={setAdults}
              onChildrenChange={setChildren}
              onInfantsChange={setInfants}
            />
          </div>
        )}
      </div>
    </main>
  )
}
