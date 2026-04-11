import './App.css'

import { GuestProvider } from './componenet/guest/guestContext'
import GuestSearch from './componenet/guest/guestSearch'
import GuestCounter from './componenet/guest/guestCounter'
import { useGuest } from './componenet/guest/guestContext'

import DateSearch from './componenet/date/dateSearch'

import DestinationSearch from './componenet/destination/destinationSearch'

function App() {
    return (
        <>
            <GuestProvider>
                <div style={{background: "#eee"}}>
                    <div className='main-container'>
                        <DateSearch />
                        <DestinationSearch />
                        <GuestSearch />
                    </div>
                </div>
                <GuestCounter />
            </GuestProvider>
        </>
    )
}

export default App
