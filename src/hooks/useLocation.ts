// hooks/useLocation.ts
import { useState } from "react";
import { fetchLocations } from "../api/location";
import type { LocationItem } from "..//api/location.ts"

export default function useLocation() {
    const [searchQuery, setSearchQuery] = useState("");
    const [locations, setLocations]  = useState<LocationItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // searchQuery 바뀔 때마다 fetch 호출하는 함수
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        const result = await fetchLocations(query);
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
        }
    }



    return { searchQuery, locations, selectedIndex, handleSearch, handleKeyDown}
};