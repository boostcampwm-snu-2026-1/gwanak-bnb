// components/LocationModal.tsx
import { MapPin } from "lucide-react";
import type { LocationItem } from "../api/location";


interface LocationModalProps {
    locations: LocationItem[];
    selectedIndex: number;
}

export default function LocationModal({ locations, selectedIndex }: LocationModalProps) {
    return (
        <div className="absolute top-full left-0 bg-white shadow-xl rounded-3xl z-10 py-3 mt-3 w-96">
            <ul>
                {locations.slice(0, 5).map((item, index) => (
                    <li
                        key={item.id}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? "bg-gray-100" : ""}`}
                    >
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full flex-shrink-0">
                            <MapPin size={18} className="text-gray-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">{item.display_name}</span>
                            <span className="text-sm text-gray-500">{item.sub_title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}