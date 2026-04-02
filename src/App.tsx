import React, { useState } from 'react';
import GuestModal from './components/guest/GuestModal';

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

            <h1 className="text-2xl font-bold mb-8 text-gray-800">에어비앤비 게스트 선택</h1>

            <GuestModal
                counts={counts}
                updateCount={updateCount}
            />

        </div>
    );
};

export default App;