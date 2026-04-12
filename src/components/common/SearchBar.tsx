import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import GuestModal from '../guest/GuestModal';
import PlaceUI from '../place/PlaceUI';

const SearchBar: React.FC = () => {
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);

    const toggleGuestModal = () => {
        setIsGuestModalOpen(prev => !prev);
        setIsPlaceModalOpen(false);
    };

    const togglePlaceModal = () => {
        setIsPlaceModalOpen(prev => !prev);
        setIsGuestModalOpen(false);
    };

    const [counts, setCounts] = useState({
        adult: 0,
        child: 0,
        infant: 0,
        pet: 0,
    });

    const updateCount = (type: keyof typeof counts, diff: number) => {
        setCounts(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + diff),
        }));
    };

    const totalGuests = counts.adult + counts.child;

    const searchBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsGuestModalOpen(false);
                setIsPlaceModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isAnyOpen = isPlaceModalOpen || isGuestModalOpen;

    const getTabClass = (isOpen: boolean) => {
        if (isOpen) return 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] z-50';
        if (isAnyOpen) return 'hover:bg-[#dddddd]'; // slightly darker than gray-200
        return 'hover:bg-gray-100';
    };

    return (
        <div
            ref={searchBarRef}
            className={`relative flex items-center border border-gray-200 rounded-full shadow-sm transition-colors w-full max-w-[850px] mx-auto h-[66px] ${isAnyOpen ? 'bg-[#ebebeb]' : 'bg-white hover:shadow-md'}`}
        >
            <div
                className={`relative flex flex-col justify-center min-w-[280px] h-full cursor-pointer transition rounded-full ${getTabClass(isPlaceModalOpen)}`}
                onClick={!isPlaceModalOpen ? togglePlaceModal : undefined}
            >
                {isPlaceModalOpen ? (
                    <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <PlaceUI />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center h-full px-8">
                        <span className="text-xs font-bold text-black">여행지</span>
                        <span className="text-sm text-gray-500 truncate">여행지를 검색</span>
                    </div>
                )}
                {!isPlaceModalOpen && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-gray-300" />}
            </div>

            <div className={`relative flex-1 flex flex-col px-6 justify-center h-full cursor-pointer transition rounded-full ${getTabClass(false)}`}>
                <span className="text-xs font-bold text-black">날짜</span>
                <span className="text-sm text-gray-500">날짜 추가</span>
                {!isGuestModalOpen && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-gray-300" />}
            </div>

            <div
                className={`relative flex-1 flex flex-col justify-center px-6 h-full cursor-pointer transition rounded-full ${getTabClass(isGuestModalOpen)}`}
                onClick={toggleGuestModal}
            >
                <span className="text-xs font-bold text-black">여행자</span>
                <div className="text-sm">
                    {totalGuests > 0 ? (
                        <span className="text-black font-semibold">
                            게스트 {totalGuests}명
                            {counts.infant > 0 && <span className="text-black font-semibold">, 유아 {counts.infant}명</span>}
                            {counts.pet > 0 && <span className="text-black font-semibold">, 반려동물 {counts.pet}마리</span>}
                        </span>
                    ) : (
                        <span className="text-gray-500">게스트 추가</span>
                    )}
                </div>
                {isGuestModalOpen && (
                    <div
                        className="absolute top-[calc(100%+16px)] right-0 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GuestModal
                            counts={counts}
                            updateCount={updateCount}
                        />
                    </div>
                )}
            </div>

            <div className="pr-2 pl-2 flex-shrink-0">
                <div className="bg-[#FF385C] p-[14px] rounded-full text-white cursor-pointer hover:bg-rose-600 transition">
                    <Search size={16} strokeWidth={3} />
                </div>
            </div>

        </div>
    );
};

export default SearchBar;