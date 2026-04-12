//components/SearchBar.tsx
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import DateModal from "./DateModal";
import GuestModal from "./GuestModal";

import LocationSearch from "./LocationSearch"


export type ModalType = "location" | "date" | "guest" | null

export default function SearchBar() {
    const [openModal, setOpenModal] = useState<ModalType>(null);

    const locationRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);
    const guestRef = useRef<HTMLDivElement>(null);

    const modalRefs = useMemo(() => ({
        location: locationRef,
        date: dateRef,
        guest: guestRef,
    }), []);
    
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
    }, [openModal, modalRefs]);

    return (
        <div className="bg-white rounded-full shadow-md flex items-center px-4 py-2 gap-4 w-full max-w-3xl mx-auto">
            <LocationSearch 
                openModal = {openModal}
                setOpenModal={setOpenModal}
                modalRef = {modalRefs.location}
            />
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
            <button type="button" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 ml-2 flex items-center gap-2">
                <Search size={20} />
                {openModal && <span className="text-white text-sm font-semibold pr-2">검색</span>}
            </button>
        </div>
    )
}



