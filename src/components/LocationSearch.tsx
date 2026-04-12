//components/LocationSearch.tsx
import type { ModalType } from "./SearchBar"
import LocationModal from "./LocationModal";

interface LocationSearchProps{
    openModal: ModalType;
    setOpenModal: (modal: ModalType) => void;
    modalRefs: React.RefObject<HTMLDivElement | null>;

};

export default function LocationSearch({openModal, setOpenModal, modalRefs}:LocationSearchProps) {
    return (
        <div ref={modalRefs} className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer flex-1">
            <span className="text-xs font-semibold">여행지</span>
            <button type="button" className="text-sm text-gray-500 text-left" onClick={(e) => {
                e.stopPropagation();
                setOpenModal("location" );
            }}>여행지 검색</button>
            {openModal === "location" && <LocationModal />}
        </div>
    );
}