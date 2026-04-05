import { StrictMode, useState } from 'react'
import './App.css'
import SearchPage from './searchPage'
import CountPage from './countPage'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <SearchPage 
                onToggle={() => setIsModalOpen(!isModalOpen)}
                isOpen={isModalOpen}
            />
            {isModalOpen && <CountPage />}
        </>
    )
}

export default App
