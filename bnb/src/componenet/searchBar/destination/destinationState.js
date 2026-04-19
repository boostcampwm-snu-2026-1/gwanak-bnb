import { useState, useEffect } from "react";
import { LOCATIONS } from "../../../data/location";
import { RECOMMENDATIONS } from "../../../data/recommendation";

const useDestinationState = () => {
    // 여행지 입력 창에 입력된 검색어
    const [searchTerm, setSearchTerm] = useState("");
    
    const onSearchChange = (value) => {
        setSearchTerm(value);
        setLocationId(null);
    }

    const [locationId, setLocationId] = useState(null);

    const onSelectLocation = (location) => {
        setSearchTerm(location.title);
        setLocationId(location.id);
    };

    // location에서 각 요소의 부모들을 추출
    const getParentDesc = (location) => {
        let parents = [];
        let currentParentId = location.parentId;

        while (currentParentId) {
            const parent = LOCATIONS.find(loc => loc.id === currentParentId);
            if (parent) {
                parents.push(parent.title);
                currentParentId = parent.parentId;
            } else break;
        }

        return parents.reverse().join(" ");
    };

    // 검색어에 따른 리스트
    const getFilteredList = () => {
        if (!searchTerm) return RECOMMENDATIONS;

        return LOCATIONS
            .filter(item => item.title.includes(searchTerm))
            .map(item => ({
                id: item.id,
                title: item.title,
                desc: getParentDesc(item),
                icon: "fa-solid fa-location-dot fa-lg"
            }));
    };

    const displayList = getFilteredList();

    // 화살표
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchTerm]);

    const handleKeyDown = (e) => {
        const listLength = displayList.length;
        if (listLength === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev < listLength - 1 ? prev + 1 : -1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev > -1 ? prev - 1 : displayList.length - 1));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0) {
                e.preventDefault();
                onSelectLocation(displayList[selectedIndex]);
                setSelectedIndex(-1);
            }
        }
    };
    
    return {
        searchTerm,
        setSearchTerm,
        onSearchChange,
        displayList,
        selectedIndex,
        handleKeyDown,
        onSelectLocation,
        locationId
    };
};

export default useDestinationState;