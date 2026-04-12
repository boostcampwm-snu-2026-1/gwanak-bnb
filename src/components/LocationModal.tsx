// components/LocationModal.tsx
import type { LocationItem } from "../api/location";

interface LocationModalProps {
    locations: LocationItem[];
    selectedIndex: number;
}

export default function LocationModal({ locations, selectedIndex }: LocationModalProps) {
    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-2xl z-10">
            <ul>
                {locations.map((item, index) => (
                    <li
                        key={item.id}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? "bg-gray-100" : ""}`}
                    >
                        <span className="text-2xl">📍</span>
                        <div>
                            <span className="font-semibold">{item.display_name}</span>
                            <span className="text-sm text-gray-500 ml-2">{item.sub_title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}