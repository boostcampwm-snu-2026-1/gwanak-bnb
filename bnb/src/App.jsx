import './App.css'
import './componenet/common/global.css'
import ModalBackdrop from './componenet/common/modalBackdrop'

import GuestSearch from './componenet/searchBar/guest/guestSearch'
import GuestCounter from './componenet/searchBar/guest/guestCounter'

import DateSearch from './componenet/searchBar/date/dateSearch'

import DestinationSearch from './componenet/searchBar/destination/destinationSearch'
import DestinationModal from './componenet/searchBar/destination/destinationModal'

import DateModal from './componenet/searchBar/date/dateModal'

import SearchResult from './componenet/searchResult/searchResult'

import { SearchProvider } from './context/searchContext'

import { Routes, Route } from 'react-router-dom'

function App() {

    return (
        <SearchProvider>
            <Routes>
                <Route path="/" element={
                    <>
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
                            <DateModal /> 
                        </div>
                    </>
                } />

                <Route path="/search" element={<SearchResult />} />
            </Routes>
        </SearchProvider>
    )
}

export default App
