import { useState } from 'react'
import './App.css'
import SearchPage from './componenet/guest/searchPage'
import CountPage from './componenet/guest/countPage'
import useGuestState from './componenet/guest/useGuestState'

function App() {
    const {
        isModalOpen,
        counts,
        setCounts,
        guestCount,
        getGuestMessage,
        resetGuestCount,
        toggleModal
    } = useGuestState();

    return (
        <>
            <SearchPage />
        </>
    )
}

export default App
