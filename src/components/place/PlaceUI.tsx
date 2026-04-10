import { useState, useRef, useEffect } from 'react';
import PlaceInput from './PlaceInput';
import PlaceList from './PlaceList';
import { getFilteredPlaces } from './PlaceSearch';

const PlaceUI = () => {
    const [keyword, setKeyword] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const displayItems = getFilteredPlaces(keyword);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (displayItems.length === 0) return;

        if (e.key === "ArrowDown") {
            setFocusedIndex((prev) => (prev + 1) % displayItems.length);
        } else if (e.key === "ArrowUp") {
            setFocusedIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
        } else if (e.key === "Enter") {
            if (focusedIndex >= 0 && focusedIndex < displayItems.length) {
                const selectedPlace = displayItems[focusedIndex];
                setKeyword(selectedPlace.name);
                setFocusedIndex(-1);
                console.log("선택된 장소:", selectedPlace.name);
            }
        } else if (e.key === "Escape") {
            setFocusedIndex(-1);
        }
    };

    return (
        <div className="absolute top-full left-0 w-[400px] bg-white rounded-3xl shadow-2xl mt-4 overflow-hidden border border-gray-100 z-50">
            <PlaceInput
                value={keyword}
                inputRef={inputRef}
                onChange={(value) => {
                    setKeyword(value);
                    setFocusedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
            />
            <PlaceList
                places={displayItems}
                focusedIndex={focusedIndex}
                onItemClick={(place) => {
                    setKeyword(place.name);
                    setFocusedIndex(-1);
                }}
            />
        </div>
    );
};

export default PlaceUI;