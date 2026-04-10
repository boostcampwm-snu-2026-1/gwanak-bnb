import React, { useState } from 'react';
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

    return (
        <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer py-2 px-4 w-full max-w-[850px] mx-auto">
            <div
                className="relative flex-1 flex flex-col px-4 cursor-pointer hover:bg-gray-100 transition rounded-full border-r border-gray-200"
                onClick={togglePlaceModal}
            >
                <span className="text-xs font-bold">여행지</span>
                <span className="text-sm text-gray-500">여행지를 검색</span>
                {isPlaceModalOpen && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <PlaceUI />
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col px-4 border-r border-gray-200">
                <span className="text-xs font-bold">날짜</span>
                <span className="text-sm text-gray-500">날짜 추가</span>
            </div>

            <div
                className="relative flex-1 flex flex-col px-6 cursor-pointer hover:bg-gray-100 transition rounded-full"
                onClick={toggleGuestModal}
            >
                <span className="text-xs font-bold">여행자</span>
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
                        className="absolute top-full right-0 mt-4 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GuestModal
                            counts={counts}
                            updateCount={updateCount}
                        />
                    </div>
                )}
            </div>

            <div className="bg-[#FF385C] p-3 rounded-full text-white ml-2">
                <Search size={16} strokeWidth={3} />
            </div>

        </div>
    );
};

export default SearchBar;