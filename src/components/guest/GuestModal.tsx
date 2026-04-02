import React from 'react';
import CounterRow from './CounterRow';

interface GuestModalProps {
    counts: {
        adult: number;
        child: number;
        infant: number;
        pet: number;
    };
    updateCount: (type: 'adult' | 'child' | 'infant' | 'pet', diff: number) => void;
}

const GuestModal: React.FC<GuestModalProps> = ({ counts, updateCount }) => {
    return (
        <div className="w-[400px] bg-white rounded-3xl shadow-2xl p-8 flex flex-col border border-gray-100">

            <CounterRow
                label="성인"
                subLabel="13세 이상"
                count={counts.adult}
                onIncrease={() => updateCount('adult', 1)}
                onDecrease={() => updateCount('adult', -1)}
            />
            <CounterRow
                label="어린이"
                subLabel="2~12세"
                count={counts.child}
                onIncrease={() => updateCount('child', 1)}
                onDecrease={() => updateCount('child', -1)}
            />
            <CounterRow
                label="유아"
                subLabel="2세 미만"
                count={counts.infant}
                onIncrease={() => updateCount('infant', 1)}
                onDecrease={() => updateCount('infant', -1)}
            />
            <CounterRow
                label="반려동물"
                subLabel="보조동물을 동반하시나요?"
                count={counts.pet}
                onIncrease={() => updateCount('pet', 1)}
                onDecrease={() => updateCount('pet', -1)}
            />
        </div>
    );
};

export default GuestModal;