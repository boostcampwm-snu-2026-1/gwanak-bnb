//components/LocationSearch.tsx
import useLocation from "../hooks/useLocation";
import LocationModal from "./LocationModal";
import type { ModalType } from "./SearchBar"
import { X } from "lucide-react";

interface LocationSearchProps{
    openModal: ModalType;
    setOpenModal: (modal: ModalType) => void;
    modalRef: React.RefObject<HTMLDivElement | null>;

};

export default function LocationSearch({openModal, setOpenModal, modalRef}:LocationSearchProps) {
    const { searchQuery, locations, selectedIndex, isSelected, handleSearch, handleKeyDown} = useLocation(setOpenModal);
    return (
        <div ref={modalRef} className="relative flex items-center px-6 py-3 hover:bg-gray-100 rounded-full cursor-pointer flex-1 bg-white">
            <div className="flex flex-col flex-1">
                <span className="text-xs font-semibold">여행지</span>
                <input
                    type="text"
                    className="text-sm text-gray-500 bg-transparent outline-none w-full"
                    placeholder="여행지 검색"
                    value={searchQuery}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                        setOpenModal("location");
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {searchQuery && !isSelected && (
                <button type = "button"
                    onClick={() => {
                        handleSearch("");
                        setOpenModal(null);
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-gray-200"
                >
                    <X size={15} className="text-gray-600" />
                </button>
            )}
            {openModal === "location" && (
                <LocationModal
                    locations={locations}
                    selectedIndex={selectedIndex}
                />
            )}
        </div>
    );
}