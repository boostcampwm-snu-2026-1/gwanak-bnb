import React, { useState } from 'react';
import SearchBar from './components/common/SearchBar';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

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

            <SearchBar
                onOpen={toggleModal}
                isModalOpen={isModalOpen}
                counts={counts}
                updateCount={updateCount}
            />

        </div>
    );
};

export default App;