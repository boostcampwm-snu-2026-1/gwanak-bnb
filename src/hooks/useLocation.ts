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

    return { searchQuery, locations, selectedIndex, handleSearch }
};