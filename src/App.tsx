import React, { useState } from 'react';
import CounterRow from './components/guest/CounterRow';

const App: React.FC = () => {
    const [counts, setCounts] = useState({
        adult: 0,
        child: 0,
        infant: 0,
        pet: 0,
    });

    const updateCount = (type: keyof typeof counts, diff: number) => {
        setCounts(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + diff),
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">

            <div className="w-full max-w-[400px] bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <h2 className="text-xl font-bold mb-6 text-gray-900">게스트 추가</h2>

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

        </div>
    );
};

export default App;