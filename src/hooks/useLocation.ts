// hooks/useLocation.ts
import { useState } from "react";
import { fetchLocations } from "../api/location";
import type { LocationItem } from "../api/location";
import type { ModalType } from "../components/SearchBar";

export default function useLocation(setOpenModal: (modal: ModalType) => void) {
    const [searchQuery, setSearchQuery] = useState("");
    const [locations, setLocations]  = useState<LocationItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isSelected, setIsSelected] = useState(false);

    // searchQuery 바뀔 때마다 fetch 호출하는 함수
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        const result = await fetchLocations(query);
        if (result.length === 0) {
            setOpenModal(null); // 결과 없으면 모달 닫기
        }
        setLocations(result);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev + 1) % locations.length);
        }
        if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev - 1) % locations.length);
        }
        if (e.key === "Enter" && selectedIndex >= 0) {
            setSearchQuery(locations[selectedIndex].display_name);
            setIsSelected(true);
            setOpenModal(null);
        }
    }
    return { searchQuery, locations, selectedIndex, isSelected, handleSearch, handleKeyDown}
};