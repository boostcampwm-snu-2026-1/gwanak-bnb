//components/GuestCounter.tsx

import { useState } from "react";

export type GuestCounterProps = {
    name: string;
    description: string;
};

export default function GuestCounter({name, description}:GuestCounterProps) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <span>{name}, {description}</span>
            <div>
                <button type = "button" disabled = {count === 0} onClick={() => setCount(count - 1)}>-</button>
                {count}
                <button type = "button" onClick={() => setCount(count + 1)}>+</button>
            </div>

        </div>
    );
}

