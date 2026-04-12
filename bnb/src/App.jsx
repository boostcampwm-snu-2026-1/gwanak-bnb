import './App.css'
import './componenet/common/global.css'
import ModalBackdrop from './componenet/common/modalBackdrop'

import GuestSearch from './componenet/guest/guestSearch'
import GuestCounter from './componenet/guest/guestCounter'

import DateSearch from './componenet/date/dateSearch'

import DestinationSearch from './componenet/destination/destinationSearch'
import DestinationModal from './componenet/destination/DestinationModal'

import { SearchProvider } from './context/searchContext'

function App() {

    return (
        <>
            <SearchProvider>
                <ModalBackdrop />
                <div style={{background: "#eee"}}>
                    <div className='main-container'>
                        <DestinationSearch />
                        <DateSearch />
                        <GuestSearch />
                    </div>
                </div>
                <div className='search-anchor'>
                    <GuestCounter />
                    <DestinationModal />
                </div>
            </SearchProvider>
        </>
    )
}

export default App
