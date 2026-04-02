import React from 'react';

interface CounterRowProps {
    label: string;
    subLabel: string;
    count: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const CounterRow: React.FC<CounterRowProps> = ({
    label,
    subLabel,
    count,
    onIncrease,
    onDecrease,
}) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-lg font-medium">{label}</p>
                <p className="text-sm text-gray-500">{subLabel}</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onDecrease}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    -
                </button>
                <span className="w-8 text-center">{count}</span>
                <button
                    onClick={onIncrease}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CounterRow;