import { Location } from "@/types/location";
import { LocationIcon } from "./LocationIcon";

interface LocationListItemProps {
  location: Location;
  isHighlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export function LocationListItem({ location, isHighlighted, onClick, onMouseEnter }: LocationListItemProps) {
  return (
    <li
      className={`px-6 py-3 flex items-center gap-4 cursor-pointer transition-colors ${
        isHighlighted ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="option"
      aria-selected={isHighlighted}
    >
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
        <LocationIcon type={location.type} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#222] truncate">{location.name}</p>
        <p className="text-xs text-gray-500 truncate">{location.region}</p>
      </div>
    </li>
  );
}