interface PlaceProps {
    place: {
        name: string;
        country: string;
    };
    isFocused: boolean;
    onClick: () => void;
}

const Place: React.FC<PlaceProps> = ({ place, isFocused, onClick }) => {
    return (
        <li
            onClick={onClick}
            className={`flex items-center p-3 cursor-pointer ${isFocused ? 'bg-gray-100' : 'bg-white'}`}
        >
            <div className="mr-3 text-gray-500">📍</div>
            <div>
                <p className="font-medium text-black">{place.name}</p>
                <p className="text-sm text-gray-500">{place.country}</p>
            </div>
        </li>
    );
};

export default Place;
