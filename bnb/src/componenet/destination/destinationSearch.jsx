import './destination.css'
import { useSearch } from '../../context/searchContext'

function DestinationSearch() {
    const { isOpenDestination, onToggleDestination } = useSearch();
    return (
        <div 
            className={`search ${isOpenDestination ? 'active-left' : ''}`}
            onClick={onToggleDestination}
        >
            <div>
                <h6>여행지</h6>
                <p>여행지 검색</p>
            </div>
            <div className='divider-right'></div>
        </div>
    )
}

export default DestinationSearch