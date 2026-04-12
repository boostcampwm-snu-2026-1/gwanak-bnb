import Place from './Place'

interface PlaceListProps {
    places: {
        id: number;
        name: string;
        country: string;
    }[];
    focusedIndex: number;
    onItemClick: (item: { id: number; name: string; country: string }) => void;
}

const PlaceList = ({ places, focusedIndex, onItemClick }: PlaceListProps) => {
    return (
        <ul className="absolute top-[calc(100%+16px)] left-0 w-[400px] mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden py-4 z-50 max-h-[400px] overflow-y-auto">
            {places.length === 0 && (
                <p className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    추천 여행지
                </p>
            )}
            {places.map((place, index) => (
                <Place
                    key={place.id}
                    place={place}
                    isFocused={index === focusedIndex}
                    onClick={() => onItemClick(place)}
                />
            ))}
        </ul>
    );
};

export default PlaceList;