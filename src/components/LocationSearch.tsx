//components/LocationSearch.tsx
import useLocation from "../hooks/useLocation";
import LocationModal from "./LocationModal";
import type { ModalType } from "./SearchBar"

interface LocationSearchProps{
    openModal: ModalType;
    setOpenModal: (modal: ModalType) => void;
    modalRef: React.RefObject<HTMLDivElement | null>;

};

export default function LocationSearch({openModal, setOpenModal, modalRef}:LocationSearchProps) {
    const { searchQuery, locations, selectedIndex, handleSearch, handleKeyDown} = useLocation(setOpenModal);
    return (
        <div ref={modalRef} className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer flex-1">
            <span className="text-xs font-semibold">여행지</span>
                <input
                    type="text"
                    className="text-sm text-gray-500 text-left bg-transparent outline-none"
                    placeholder="여행지 검색"
                    value={searchQuery}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                        setOpenModal("location")
                    }}
                    onKeyDown={handleKeyDown}
                />
            {openModal === "location" && (
                <LocationModal 
                    locations={locations}
                    selectedIndex={selectedIndex}
                />
            )}
        </div>
    );
}