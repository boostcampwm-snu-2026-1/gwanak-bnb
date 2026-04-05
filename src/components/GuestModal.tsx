//components/GuestModal.tsx

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type GuestCounterProps = {
    name: string;
    description: string;
};

function GuestCounter({name, description}:GuestCounterProps) {
    const [count, setCount] = useState(0);

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-none">
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{name}</span>
                <span className="text-gray-400 text-xs">{description}</span>
            </div>
            <div className="flex items-center gap-3">
                <button type="button" disabled={count === 0}
                    className="w-8 h-8 rounded-full border border-gray-300 text-gray-500 disabled:opacity-30 hover:border-gray-500 flex items-center justify-center"
                    onClick={() => setCount(count - 1)}><Minus size={16} /></button>
                <span className="w-4 text-center text-sm">{count}</span>
                <button type="button"
                    className="w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:border-gray-500 flex items-center justify-center"
                    onClick={() => setCount(count + 1)}><Plus size={16} /></button>
            </div>
        </div>
    );
}

export default function GuestModal() {
    return (
        <div className="absolute top-16 left-0 bg-white rounded-3xl shadow-xl p-6 w-80 z-50">
            <GuestCounter name="성인" description="만 13세 이상" />
            <GuestCounter name="어린이" description="2~12세" />
            <GuestCounter name="유아" description="2세 미만" />
            <GuestCounter name="반려동물" description="보조동물 포함" />
        </div>
    );
}