import { useState, useEffect } from "react";
import { LOCATIONS } from "../../data/location";
import { RECOMMENDATIONS } from "../../data/recommendation";

const useDestinationState = () => {
    // 여행지 입력 창에 입력된 검색어
    const [searchTerm, setSearchTerm] = useState("");
    
    const onSearchChange = (value) => setSearchTerm(value);

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
                id: `loc-${item.id}`,
                title: item.title,
                desc: getParentDesc(item),
                icon: "fa-solid fa-location-dot fa-lg"
            }));
    };

    const displayList = getFilteredList();
    
    return {
        searchTerm,
        setSearchTerm,
        onSearchChange,
        displayList
    };
};

export default useDestinationState;