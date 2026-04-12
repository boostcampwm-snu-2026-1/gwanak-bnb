import { useState, useEffect } from "react";
import { LOCATIONS } from "../../data/location";
import { RECOMMENDATIONS } from "../../data/recommendation";

const useDestinationState = () => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const onSearchChange = (value) => setSearchTerm(value);

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