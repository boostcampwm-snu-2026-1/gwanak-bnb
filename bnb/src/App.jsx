import './App.css'

import GuestSearch from './componenet/guest/guestSearch'
import GuestCounter from './componenet/guest/guestCounter'

import DateSearch from './componenet/date/dateSearch'

import DestinationSearch from './componenet/destination/destinationSearch'

import { SearchProvider } from './context/searchContext'

function App() {
    return (
        <>
            <SearchProvider>
                <div style={{background: "#eee"}}>
                    <div className='main-container'>
                        <DateSearch />
                        <DestinationSearch />
                        <GuestSearch />
                    </div>
                </div>
                <GuestCounter />
            </SearchProvider>
        </>
    )
}

export default App
