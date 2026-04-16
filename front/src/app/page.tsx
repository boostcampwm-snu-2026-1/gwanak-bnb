"use client"

import { useState } from "react"
import { GuestSelector } from "./components/GuestSelector"
import { LocationSearch } from "./components/LocationSearch"
import SearchResult from "./components/SearchResult"
import { IAccommodation } from "@/types/accommodation"

export default function Home() {
  const [location, setLocation] = useState("")
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [isGuestOpen, setIsGuestOpen] = useState(false)

  // API 연동을 위한 추가 상태
  const [accommodations, setAccommodations] = useState<IAccommodation[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const totalGuests = adults + children
  const guestText = totalGuests > 0 
    ? `게스트 ${totalGuests}명${infants > 0 ? `, 유아 ${infants}명` : ""}`
    : "게스트 추가"

  const handleLocationOpen = (open: boolean) => {
    setIsLocationOpen(open)
    if (open) setIsGuestOpen(false)
  }

  const handleGuestOpen = () => {
    setIsGuestOpen(!isGuestOpen)
    if (!isGuestOpen) setIsLocationOpen(false)
  }

  // 검색 API 호출 함수
  const handleSearch = async () => {
    if (!location) {
      alert("여행지를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // 환경 변수에서 API 기본 주소를 가져옴
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${apiUrl}/accommodations?location=${location}&guests=${totalGuests}`);
      
      if (!res.ok) throw new Error("데이터를 불러오는데 실패했습니다.");
      
      const data: IAccommodation[] = await res.json();
      setAccommodations(data);
    } catch (error) {
      console.error(error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] pt-8 px-4 pb-20">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 flex items-center">
          <div className="flex-1">
            <LocationSearch
              value={location}
              onChange={setLocation}
              isOpen={isLocationOpen}
              onOpenChange={handleLocationOpen}
            />
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div className="flex-1 px-6 py-4 cursor-not-allowed opacity-60">
            <p className="text-xs font-semibold text-[#222]">날짜</p>
            <p className="text-sm text-gray-400">날짜 추가</p>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div 
            className={`flex-1 px-6 py-4 cursor-pointer rounded-full transition-colors ${isGuestOpen ? "bg-white shadow-md" : "hover:bg-gray-50"}`}
            onClick={handleGuestOpen}
          >
            <p className="text-xs font-semibold text-[#222]">여행자</p>
            <p className={`text-sm ${totalGuests > 0 ? "text-[#222]" : "text-gray-400"}`}>
              {guestText}
            </p>
          </div>

          {/* 검색 버튼에 onClick 연결 */}
          <button 
            onClick={handleSearch}
            className="bg-[#ff385c] hover:bg-[#e31c5f] text-white p-3 rounded-full mr-2 transition-colors flex items-center justify-center"
            aria-label="검색"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block"></span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            )}
          </button>
        </div>

        {isGuestOpen && (
          <div className="absolute mt-2 right-0 w-96 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 z-50">
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

      {/* 검색 결과 컴포넌트 동적 렌더링 */}
      <SearchResult accommodations={accommodations} hasSearched={hasSearched} />
    </main>
  )
}
