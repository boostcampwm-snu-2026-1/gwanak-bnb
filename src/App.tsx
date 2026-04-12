import React from 'react';
import SearchBar from './components/common/SearchBar';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">

            <SearchBar />

        </div>
    );
};

export default App;