//components/SearchBar.tsx

import { useEffect, useRef, useState } from "react";
import DateModal from "./DateModal";
import GuestModal from "./GuestModal";
import LocationtModal from "./LocationModal";
import { Search } from "lucide-react";



export default function SearchBar() {
    const [openModal, setOpenModal] = useState<"location" | "date" | "guest" | null>(null);

    const modalRefs = {
        location: useRef<HTMLDivElement>(null),
        date: useRef<HTMLDivElement>(null),
        guest: useRef<HTMLDivElement>(null),
    };
    
    useEffect(() => {
        if (!openModal) return;
        const handleClick = (e:MouseEvent) => {
            const currentRef = modalRefs[openModal]
            if (!currentRef.current?.contains(e.target as Node)) {
                setOpenModal(null);
            }
        };
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [openModal]);

    return (
    <>
    <div className="bg-white rounded-full shadow-md flex items-center px-4 py-2 gap-4 w-full max-w-3xl mx-auto">
        <div ref={modalRefs.location} className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer flex-1">
            <span className="text-xs font-semibold">여행지</span>
            <button type="button" className="text-sm text-gray-500 text-left" onClick={(e) => {
                e.stopPropagation();
                setOpenModal("location" );
            }}>여행지 검색</button>
            {openModal === "location" && <LocationtModal />}
        </div>
        <div className="w-px h-8 bg-gray-300" /> {/* 구분선 */}
        <div ref={modalRefs.date} className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer flex-1">
            <span className="text-xs font-semibold">날짜</span>
            <button type="button" className="text-sm text-gray-500 text-left" onClick={(e) => {
                e.stopPropagation();
                setOpenModal("date");
            }}>날짜 추가</button>
            {openModal === "date" && <DateModal />}
        </div>
        <div className="w-px h-8 bg-gray-300" /> {/* 구분선 */}
        <div ref={modalRefs.guest} className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer flex-1">
            <span className="text-xs font-semibold">여행자</span>
            <button type="button" className="text-sm text-gray-500 text-left" onClick={(e) => {
                e.stopPropagation();
                setOpenModal("guest");
            }}>게스트 추가</button>
            {openModal === "guest" && <GuestModal />}
        </div>
        <button type="button" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 ml-2">
            <Search size={20} />
        </button>
    </div>
    </>
)


}



