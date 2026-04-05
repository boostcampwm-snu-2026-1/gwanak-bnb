//components/SearchBar.tsx

import { useEffect, useRef, useState } from "react";
import GuestModal from "./GuestModal";
import { Search } from "lucide-react";



export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClick = (e:MouseEvent) => {
            if (!modalRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isOpen]);

    return (
        <>
        <div>
            <div>
                <span>여행지</span>
                {/* TODO: 여행지 클릭 시 모달 연결 */}
                <input type="text" placeholder="여행지 검색" />
            </div>
            <div>
                <span>날짜</span>
                {/* TODO: 날짜 클릭 시 모달 연결 */}
                <input type="text" placeholder="날짜 추가" />
            </div>
            <div ref={modalRef}>
                <span>여행자</span>
                <button type="button" onClick={(e) => {
                    e.stopPropagation(); 
                    setIsOpen(!isOpen);
                    }}>게스트 추가</button>
                {isOpen && <GuestModal />}
            </div>
            <button type = "button">
                <Search size = {20} />
            </button>
        </div>
        </>
    )


}



