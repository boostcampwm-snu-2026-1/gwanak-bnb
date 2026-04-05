import { StrictMode, use, useState } from 'react'
import './App.css'
import SearchPage from './searchPage'
import CountPage from './countPage'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [counts, setCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    });

    const getGuestMessage = () => {
        const { adults, children, infants, pets } = counts;
        const guestCount = adults + children + infants + pets;

        if (guestCount === 0) return '게스트 추가';

        else return `게스트 ${guestCount}명`;
    }

    const guestCount = counts.adults + counts.children + counts.infants + counts.pets;

    const resetGuestCount = () => {
        setCounts({
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        });
    };

    return (
        <>
            <SearchPage 
                onToggle={() => setIsModalOpen(!isModalOpen)}
                isOpen={isModalOpen}
                guestMessage = {getGuestMessage()}
                onReset={resetGuestCount}
                showReset={isModalOpen && guestCount > 0}
            />
            {isModalOpen && (
                <CountPage 
                    counts={counts}
                    setCounts={setCounts}
                />
            )}
        </>
    )
}

export default App
